"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="
          fixed top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0
          z-[9999999]
          flex flex-col gap-2
          pointer-events-none
          w-[90vw] sm:w-auto max-w-[460px]
        "
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`
              pointer-events-auto
              flex items-start justify-between
              gap-3
              px-4 py-3
              rounded-[6px]
              border-[3px] border-black
              shadow-[4px_4px_0_rgba(0,0,0,0.85)]
              font-pixeboy
              text-[20px] sm:text-[22px]
              leading-none
              tracking-wide
              cursor-pointer
              transition-all duration-200
              ${
                toast.type === "success"
                  ? "bg-[#073f50] text-[#4ade80]"
                  : "bg-[#501d26] text-[#f87171]"
              }
            `}
          >
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <span className="text-[22px] shrink-0 mt-0.5">
                {toast.type === "success" ? "✓" : "✕"}
              </span>
              <span className="leading-tight break-words">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
