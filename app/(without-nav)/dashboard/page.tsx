'use client';

import { useLoadingRouter as useRouter } from '@/components/NavigationLoader';
import HackathonSelectionScreen from '@/components/hackathonSelectScreen';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';
import { useSimpleLoading } from '@/components/NavigationLoader';

export default function TestUIPage() {
  const router = useRouter();
  const { hasTeam, loading } = useAuth();

  useEffect(() => {
    if (!loading && hasTeam) {
      router.replace('/team');
    }
  }, [hasTeam, loading, router]);

  useSimpleLoading(loading || hasTeam);

  // If loading or redirecting, return null to prevent screen flicker
  if (loading || hasTeam) return null;

  return (
    <main className="w-screen h-dvh overflow-hidden m-0 p-0">
      <HackathonSelectionScreen
        onBuildTeam={() => router.push('/team')}
        onJoinTeam={() => router.push('/join-team')}
      />
    </main>
  );
}
