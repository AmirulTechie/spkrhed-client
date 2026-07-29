import { WORK_PROJECTS } from "@/data/work";

// A true masonry layout, not a shared checkerboard grid: each of the 4
// columns has its own independent sequence of tile heights (in grid-cell
// units), so row seams don't line up across columns — a tile's bottom edge
// in column 0 lands at a different y than its neighbor in column 1, the way
// a real masonry/Pinterest layout staggers.
//
// Every column's sequence sums to the same BLOCK_ROWS, so each column still
// tiles seamlessly with itself when repeated vertically, and all 4 columns
// together still form one clean BLOCK_COLS x BLOCK_ROWS rectangle that
// WorkGrid can repeat edge-to-edge for the infinite pan.
export const BLOCK_COLS = 4;
export const BLOCK_ROWS = 3.9;

// Each column also pans vertically at its own speed (WorkGrid multiplies
// drag/wheel input by these before applying it per-column), so the columns
// drift past each other instead of moving in lockstep — the parallax feel
// on nicolaromei.com's own grid.
export const COLUMN_SPEEDS = [0.85, 1, 1.15, 0.95];

// Tile width is always exactly one column (see WorkGrid), so rowSpan doubles
// as the tile's height:width aspect ratio. Thumbnails are near-square, so
// keeping this range close to 1 (rather than the old 1/2/3) means
// object-cover only trims a modest amount off each side instead of zooming
// into a thin center strip of the source image.
const COLUMN_SEQUENCES = [
  [1, 1.3, 1.6],
  [1.3, 1.6, 1],
  [1.6, 1, 1.3],
  [1, 1.6, 1.3],
];

// COLUMNS[col] is that column's own list of { row, rowSpan, project } —
// row/rowSpan in grid-cell units, project cycling through WORK_PROJECTS
// across all 4 columns (12 slots total, 12 < 26 so nothing repeats within a
// single block).
let nextProjectIndex = 0;
export const COLUMNS = COLUMN_SEQUENCES.map((sequence) => {
  let row = 0;
  return sequence.map((rowSpan) => {
    const project = WORK_PROJECTS[nextProjectIndex % WORK_PROJECTS.length];
    nextProjectIndex += 1;
    const tile = { row, rowSpan, project };
    row += rowSpan;
    return tile;
  });
});
