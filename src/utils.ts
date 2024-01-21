const toFixed = (value: number) => Number(value.toFixed(3));

export function convertBinaryStringToArray(binaryString: string): number[] {
  return binaryString.split('').map((char) => parseInt(char));
}

// Basically this function takes an array of 1s and 0s and converts it to an array of arrays of pairs of numbers.
// Each pair represents a bar of a certain width. Each pair will be one <rect> element in the SVG.
// input: [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1]
// output: [ [ 0, 5 ], [ 9, 2 ], [ 12, 1 ], [ 15, 3 ] ]
export function convertToPairs(bars: number[]): number[][] {
  const pairs: number[][] = [];
  let start: number | null = null;

  bars.forEach((value, index) => {
    if (value === 1) {
      if (start === null) start = index;
    } else if (start !== null) {
      pairs.push([start, index - start]);
      start = null;
    }
  });

  if (start !== null) pairs.push([start, bars.length - start]);

  return pairs;
}

export function generateSimpleSvg1D(groupedPairs: number[][]): string {
  // Calculte max width of SVG, then use that to calculate width of each rectangle
  const maxWidth = groupedPairs.slice(-1)[0][0] + groupedPairs.slice(-1)[0][1];
  const widthPerUnit = 100 / maxWidth;
  const rectangles: string[] = [];
  groupedPairs.forEach((group: number[]) => {
    const position = group[0];
    const width = group[1];
    // Rectanlge height is 100% and Color is black by default. No need to specify them.
    const rectangle = `<rect x="${toFixed(position * widthPerUnit)}%" width="${toFixed(width * widthPerUnit)}%" height="100%" />`;
    rectangles.push(rectangle);
  });
  // Generated SVG will fit the parent container (100% width, 100% height)
  const svg = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${rectangles.join('')}</svg>`;
  return svg;
}
