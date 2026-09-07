import type { Problem } from '@/types/problem';

// Track names and final statements can be replaced here when released.
// Track 03 uses the supplied design's sample statement.
export const problems: Problem[] = [
  {
    id: 'track-01', index: 1, title: 'TRACK 01',
    description: 'A new challenge awaits. The problem statement for this track will be revealed soon.',
    ballColor: 'black_ball', island: 'glacier', smokeColor: '#85c9ed',
  },
  {
    id: 'track-02', index: 2, title: 'TRACK 02',
    description: 'A new challenge awaits. The problem statement for this track will be revealed soon.',
    ballColor: 'blue_red', island: 'stone_land', smokeColor: '#579df0',
  },
  {
    id: 'offline-mesh-chat', index: 3, title: 'OFFLINE MESH CHAT',
    description: 'Build a chat and file-sharing application that operates entirely offline using Bluetooth Low Energy (BLE), Wi-Fi Direct, or local area network (LAN) hopping. Messages must be end-to-end encrypted and self-destruct after a set time.',
    ballColor: 'white_ball', island: 'volcano', smokeColor: '#9955d9',
  },
  {
    id: 'track-04', index: 4, title: 'TRACK 04',
    description: 'A new challenge awaits. The problem statement for this track will be revealed soon.',
    ballColor: 'purple_ball', island: 'tropic', smokeColor: '#be8cdb',
  },
  {
    id: 'track-05', index: 5, title: 'TRACK 05',
    description: 'A new challenge awaits. The problem statement for this track will be revealed soon.',
    ballColor: 'red_ball', island: 'drylands', smokeColor: '#ee9b46',
  },
];
