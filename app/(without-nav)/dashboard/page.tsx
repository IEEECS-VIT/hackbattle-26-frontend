'use client';

import HackathonSelectionScreen from '@/components/hackathonSelectScreen';

export default function TestUIPage() {
  return (
    <main className="w-screen h-dvh overflow-hidden m-0 p-0">
      <HackathonSelectionScreen
        onBuildTeam={() => alert('Build Team clicked')}
        onJoinTeam={() => alert('Join Team clicked')}
      />
    </main>
  );
}