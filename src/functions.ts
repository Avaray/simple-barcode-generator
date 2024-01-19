// Basically this function takes an array of 1s and 0s and converts it to an array of arrays of pairs of numbers.
// Each group represents a bars of a certain width. Each group will be one <path> element in the SVG.
// First number in the pair is the starting position of the bar, second number is the width of the bar.
// INPUT:
// [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
// OUTPUT:
// [
//   [ [ 9, 1 ] ],
//   [ [ 6, 2 ], [ 13, 2 ], [ 22, 2 ] ],
//   [ [ 16, 3 ] ],
//   [ [ 0, 5 ], [ 25, 5 ] ],
//   [ [ 31, 8 ] ]
// ]
function convertToGroupedPairs(bars: number[]): number[][][] {
  const pairs: number[][] = [];
  let start: number | null = null;

  bars.forEach((value, index) => {
    if (value === 1) {
      // Start a new pair
      if (start === null) {
        start = index;
      }
    } else {
      // End the current pair
      if (start !== null) {
        pairs.push([start, index - start]);
        start = null;
      }
    }
  });

  // Check if the last pair needs to be added
  if (start !== null) {
    pairs.push([start, bars.length - start]);
  }

  const groupedPairs: { [width: number]: number[][] } = {};

  pairs.forEach((pair) => {
    const width = pair[1];
    if (!groupedPairs[width]) {
      groupedPairs[width] = [];
    }
    groupedPairs[width].push(pair);
  });

  return Object.values(groupedPairs);
}
