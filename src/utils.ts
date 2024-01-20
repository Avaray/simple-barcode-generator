const toFixed = (value: number) => value.toFixed(2);

export function convertBinaryStringToArray(binaryString: string): number[] {
  return binaryString.split('').map((char) => parseInt(char));
}

export function convertToGroupedPairs(bars: number[]): number[][][] {
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

// I need to fix this function. Calculations are wrong.
// It seems code is working, but the SVG is being generated too wide.
export function generateSimpleSvg1D(groupedPairs: number[][][]): string {
  // Calculte max width of SVG, then use that to calculate width of each rectangle
  const maxWidth = groupedPairs.slice(-1)[0][0][0] + groupedPairs.slice(-1)[0][0][1];
  console.log(`maxWidth: ${maxWidth}`);
  const widthPerUnit = 100 / maxWidth;
  console.log(`widthPerUnit: ${widthPerUnit}`);
  const rectangles: string[] = [];
  groupedPairs.forEach((group) => {
    group.forEach((pair) => {
      const position = pair[0];
      const width = pair[1];
      // Rectanlge height is 100% by default
      const rectangle = `<rect x="${toFixed(position * widthPerUnit)}%" width="${toFixed(width * widthPerUnit)}%" height="100%" />`;
      rectangles.push(rectangle);
    });
  });
  // Generated SVG will fit the parent container (100% width, 100% height)
  const svg = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${rectangles.join('')}</svg>`;
  return svg;
}