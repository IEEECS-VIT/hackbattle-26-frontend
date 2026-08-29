export type BallColor =
  | "black_ball"
  | "blue_red"
  | "green_ball"
  | "purple_ball"
  | "red_ball"
  | "white_ball"
  | "white_black_ball";

export interface Problem {
  id: string;              // stable key, e.g. "offline-mesh-chat"
  index: number;           // 1-based display number (matches "01".."07" in art)
  title: string;           // short heading shown after reveal
  description: string;     // full problem statement
  ballColor: BallColor;
  island: string;          // e.g. "/stages/glacier.svg"
  position: {
  top: string;
  left: string;
};

mobilePosition?: {
  top: string;
  left: string;
};

ballSize?: number;
stageSize?: number;

mobileBallSize?: number;
mobileStageSize?: number;

  ballOffsetTop?: string;
  ballOffsetLeft?: string;

  numberX?: number;
  numberY?: number;

  reverseOpen?: boolean;


  revealClosedBallSize?: number;
  revealOpenBallSize?: number;

  revealBallX?: number;
  revealBallY?: number;

  revealTop?: string;
  revealLeft?: string;
  revealStageSize?: number;
}
