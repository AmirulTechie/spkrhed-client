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

// Each column also pans vertically at its own speed (WorkGrid multiplies
// drag/wheel input by these before applying it per-column), so the columns
// drift past each other instead of moving in lockstep — the parallax feel
// on nicolaromei.com's own grid.
export const COLUMN_SPEEDS = [0.85, 1, 1.15, 0.95];

// Tile width is always exactly one column (see WorkGrid), so rowSpan doubles
// as the tile's height:width aspect ratio. Thumbnails are near-square, so
// keeping this range close to 1 (rather than the old 1/2/3) means
// object-cover only trims a modest amount off each side instead of zooming
// into a thin center strip of the source image. Cycled with a different
// starting offset per column (see COLUMNS below) so the stagger varies
// column to column instead of every column sharing the same rhythm.
const ROW_SPAN_PALETTE = [1, 1.3, 1.6];

// Every project needs a tile slot — a previous fixed 12-slot block silently
// dropped any project past the 12th as the catalog grew past that (half the
// current 24-project catalog was invisible on the grid before this). Sizing
// slots-per-column from WORK_PROJECTS.length instead keeps that from
// happening again, rounded up to a multiple of the palette length so every
// column still sums to the same total (one full palette cycle always
// contributes the same sum, regardless of its starting rotation) — the
// "clean rectangle" property the original fixed pattern relied on.
const MIN_SLOTS_PER_COLUMN = Math.ceil(WORK_PROJECTS.length / BLOCK_COLS);
const SLOTS_PER_COLUMN =
  Math.ceil(MIN_SLOTS_PER_COLUMN / ROW_SPAN_PALETTE.length) * ROW_SPAN_PALETTE.length;

export const BLOCK_ROWS =
  (SLOTS_PER_COLUMN / ROW_SPAN_PALETTE.length) *
  ROW_SPAN_PALETTE.reduce((sum, v) => sum + v, 0);

// COLUMNS[col] is that column's own list of { row, rowSpan, project } —
// row/rowSpan in grid-cell units, project cycling through WORK_PROJECTS
// across all 4 columns. Slot count is guaranteed >= WORK_PROJECTS.length, so
// every project gets at least one tile; the modulo only kicks in to fill any
// leftover slots past a full cycle (harmless — at most a couple of projects
// appear twice within one block, on an infinitely-repeating grid).
let nextProjectIndex = 0;
export const COLUMNS = Array.from({ length: BLOCK_COLS }, (_, col) => {
  let row = 0;
  return Array.from({ length: SLOTS_PER_COLUMN }, (_, i) => {
    const rowSpan = ROW_SPAN_PALETTE[(i + col) % ROW_SPAN_PALETTE.length];
    const project = WORK_PROJECTS[nextProjectIndex % WORK_PROJECTS.length];
    nextProjectIndex += 1;
    const tile = { row, rowSpan, project };
    row += rowSpan;
    return tile;
  });
});
