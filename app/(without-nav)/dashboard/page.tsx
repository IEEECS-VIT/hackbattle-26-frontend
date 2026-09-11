'use client';

import { useLoadingRouter as useRouter } from '@/components/NavigationLoader';
import HackathonSelectionScreen from '@/components/hackathonSelectScreen';

export default function TestUIPage() {
  const router = useRouter();

  return (
    <main className="w-screen h-dvh overflow-hidden m-0 p-0">
      <HackathonSelectionScreen
        onBuildTeam={() => router.push('/team')}
        onJoinTeam={() => router.push('/join-team')}
      />
    </main>
  );
}
