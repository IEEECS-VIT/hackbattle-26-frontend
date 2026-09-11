"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState, useTransition, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import type { ComponentProps } from "react";

const LoadingContext = createContext<{
  busy: boolean;
  begin: () => () => void;
  navigate: (href: string, replace?: boolean, options?: { scroll?: boolean }) => void;
} | null>(null);

export function NavigationLoaderProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [tasks, setTasks] = useState(0);
  const begin = useCallback(() => {
    setTasks((count) => count + 1);
    let finished = false;
    return () => {
      if (finished) return;
      finished = true;
      setTasks((count) => count - 1);
    };
  }, []);
  const navigate = useCallback((href: string, replace = false, options?: { scroll?: boolean }) => {
    startTransition(() => {
      if (replace) router.replace(href, options);
      else router.push(href, options);
    });
  }, [router]);
  const value = useMemo(() => ({ busy: pending || tasks > 0, begin, navigate }), [pending, tasks, begin, navigate]);
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useNavigationLoading() {
  const value = useContext(LoadingContext);
  if (!value) throw new Error("NavigationLoaderProvider is missing");
  return value;
}

export function useSimpleLoading(loading: boolean) {
  const { begin } = useNavigationLoading();
  useLayoutEffect(() => {
    if (loading) return begin();
  }, [loading, begin]);
}

export function useLoadingRouter() {
  const router = useRouter();
  const { navigate } = useNavigationLoading();
  return useMemo(() => ({
    ...router,
    push: (href: string, options?: { scroll?: boolean }) => navigate(href, false, options),
    replace: (href: string, options?: { scroll?: boolean }) => navigate(href, true, options),
  }), [router, navigate]);
}

export function LoadingLink({ onNavigate, ...props }: ComponentProps<typeof NextLink>) {
  const { navigate } = useNavigationLoading();
  return <NextLink {...props} onNavigate={(event) => {
    let cancelled = false;
    onNavigate?.({ preventDefault: () => { cancelled = true; event.preventDefault(); } });
    if (cancelled || typeof props.href !== "string") return;
    const url = new URL(props.href, window.location.href);
    // Same pathname + search but different (or added) hash → pure anchor scroll.
    // Let the browser handle it natively so smooth-scroll CSS works.
    const isAnchorOnly =
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash !== "";
    if (isAnchorOnly) return;
    // Same path AND same hash → no navigation needed at all.
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;
    event.preventDefault();
    navigate(props.href, props.replace, { scroll: props.scroll });
  }} />;
}

// Cover the gap between a route committing and its visible artwork decoding.
export function RouteArtwork({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const { begin } = useNavigationLoading();
  useLayoutEffect(() => {
    const images = Array.from(root.current?.querySelectorAll("img") ?? [])
      .filter((img) => {
        const rect = img.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
      });
    if (!images.length) return;
    const finish = begin();
    const timeout = window.setTimeout(finish, 8000);
    void Promise.allSettled(images.map((img) => img.decode())).then(() => {
      window.clearTimeout(timeout);
      finish();
    });
    return () => { window.clearTimeout(timeout); finish(); };
  }, [pathname, begin]);
  return <div ref={root} className="flex flex-1 flex-col">{children}</div>;
}
