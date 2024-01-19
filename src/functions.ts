function binaryStringToArray(binaryString: string): number[] {
  return binaryString.split('').map((char) => parseInt(char));
}

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

function generateSVG(groupedPairs: number[][][]): string {
  const svgStart = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">';
  const svgEnd = '</svg>';
  const lineStart = '<line x1="';
  const lineMiddle = '" y1="50%" x2="';
  const lineEnd = '" y2="50%" stroke="black" stroke-width="';

  let svgContent = '';

  groupedPairs.forEach((group) => {
    group.forEach((pair) => {
      const position = pair[0];
      const width = pair[1];

      const line = `${lineStart}${position}${lineMiddle}${position + width}${lineEnd}${width}" />`;
      svgContent += line;
    });
  });

  return svgStart + svgContent + svgEnd;
}

