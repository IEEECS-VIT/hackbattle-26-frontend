// Ball color keys must match filenames in BOTH /public/pokeballs and
// /public/open_pokeballs exactly (no extension). If you rename a file in
// one folder, rename it in the other or the open animation will 404.
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
    top: string;           // percentage string, e.g. "18%"
    left: string;
  };
  // Per-problem size overrides. Every asset (pokeball art, island art)
  // has different intrinsic proportions, so a single shared constant
  // never fits all seven. All optional — omit to fall back to the
  // relevant component's default.
  ballSize?: number;         // px — size of the pokeball button on the map (PokeballIsland). Default: 62

  // NEW: stageSize — px, the footprint of the island platform itself on
  // the map (PokeballIsland's outer box). Islands are cropped/rendered at
  // different native scales just like the pokeball art was, so this gets
  // the same per-problem override treatment as ballSize rather than
  // forcing every island onto one shared box. Default: 150
  stageSize?: number;

  // NEW: where the ball button sits ON the island, as a percentage of
  // the stage box (same units the box's own width/height use). Was
  // hardcoded to "40%"/"60%" for every island — fine when every island's
  // landing-pad art sat in roughly the same relative spot, but that's
  // not actually true across all seven SVGs. Optional; defaults to the
  // old "40%"/"60%" if omitted.
  ballOffsetTop?: string;
  ballOffsetLeft?: string;

  // NEW: the index number's position, as a raw px offset from the stage
  // box's own top-left corner. Needed because object-contain centers
  // the island art INSIDE the stage box, so as stageSize grows past the
  // art's own aspect ratio, empty space opens up around it and a
  // corner-pinned number drifts away from the visible island. There's no
  // way to auto-detect where each SVG's actual art sits inside its own
  // canvas, so this is a manual per-problem nudge, not a computed fix.
  // Defaults to (-4, -4) — the old fixed "-top-1 -left-1" position.
  numberX?: number;
  numberY?: number;

  // NEW: reverseOpen — flips the pokeball horizontally (scaleX(-1)) for
  // the reveal-panel animation only. Some ball art faces a direction that
  // reads wrong next to where the description ends up sitting; this is a
  // pure presentation flip, it does not affect the map icon.
  reverseOpen?: boolean;

  // NEW: independent sizing for the reveal panel's closed vs. open ball
  // sprite (px). Previously both were locked to one shared size, but the
  // closed and open art for a given color aren't cropped identically
  // (same issue BALL_SCALE corrects for on the map icons) — these let you
  // tune each side of the drop/shake -> burst/reveal transition on its
  // own instead of fighting one constant for both. Both optional, default
  // to RevealPanel's own fallback sizes.
  revealClosedBallSize?: number;
  revealOpenBallSize?: number;

  // NEW: x/y offset (px) for the ball sprite, ON TOP of the size above.
  // As ball size grows, the sprite can push past the edge of its own
  // stage box (or off-screen, depending on revealTop/revealLeft) —
  // rather than only being able to fix that by moving the WHOLE panel,
  // this lets you nudge just the ball itself, without moving the text
  // along with it. Applies to BOTH the closed and open sprite equally
  // (same position throughout the whole drop -> shake -> burst -> reveal
  // sequence) — if you genuinely need the closed and open ball at
  // different spots, that's no longer built in here; ask and it can come
  // back as two separate pairs instead of one.
  // Defaults to 0 (centered, no offset) if omitted.
  revealBallX?: number;
  revealBallY?: number;

  // NEW: where the whole reveal panel anchors on screen, and how big its
  // layout box is. Previously both were hardcoded Tailwind classes
  // (`top-1/2 left-[66%]`, `w-[340px] h-[340px]`) shared by every
  // problem. CSS percentage/px strings, same as `position` above —
  // `revealTop`/`revealLeft` default to "50%"/"66%", `revealStageSize`
  // (px) defaults to 360.
  revealTop?: string;
  revealLeft?: string;
  revealStageSize?: number;
}