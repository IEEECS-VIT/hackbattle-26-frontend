export type BallColor = 'black_ball' | 'blue_red' | 'white_ball' | 'purple_ball' | 'red_ball';

export interface Problem {
  id: string;
  index: number;
  title: string;
  description: string;
  ballColor: BallColor;
  island: string;
  /** Smoke tint, also used for the selected island's light. */
  smokeColor: string;
}
