class EAN13BarcodeGenerator {
  private static readonly START_MARKER = '101';
  private static readonly MIDDLE_MARKER = '01010';
  private static readonly END_MARKER = '101';
  private static readonly LEFT_PARITY: { [key: string]: string } = {
    '0': '0001101',
    '1': '0011001',
    '2': '0010011',
    '3': '0111101',
    '4': '0100011',
    '5': '0110001',
    '6': '0101111',
    '7': '0111011',
    '8': '0110111',
    '9': '0001011',
  };
  private static readonly RIGHT_PARITY: { [key: string]: string } = {
    '0': '1110010',
    '1': '1100110',
    '2': '1101100',
    '3': '1000010',
    '4': '1011100',
    '5': '1001110',
    '6': '1010000',
    '7': '1000100',
    '8': '1001000',
    '9': '1110100',
  };

  private static calculateParity(data: string): string {
    const leftDigits = data.slice(0, 6);
    const rightDigits = data.slice(6);

    const leftParity = leftDigits
      .split('')
      .map((digit) => EAN13BarcodeGenerator.LEFT_PARITY[digit])
      .join('');

    const rightParity = rightDigits
      .split('')
      .map((digit) => EAN13BarcodeGenerator.RIGHT_PARITY[digit])
      .join('');

    return leftParity + EAN13BarcodeGenerator.MIDDLE_MARKER + rightParity;
  }

  private static generateBinaryRepresentation(data: string): string {
    const parityData = EAN13BarcodeGenerator.calculateParity(data);
    return (
      EAN13BarcodeGenerator.START_MARKER +
      parityData +
      EAN13BarcodeGenerator.END_MARKER
    );
  }

  private static generateSVG(data: string): string {
    const binaryRepresentation = EAN13BarcodeGenerator.generateBinaryRepresentation(
      data
    );

    let svg = `<svg id="svgCode" version="1.1" viewBox="0 0 ${binaryRepresentation.length} 100" xmlns="http://www.w3.org/2000/svg" class="p-6 bg-base-content fill-current text-primary stroke-base-100">\n`;

    // Currently I'm working on functions to use here.

    svg += '</svg>';

    return svg;
  }

  static generateEAN13Barcode(data: string): string {
    if (!/^0?\d{12}$/.test(data)) {
      throw new Error('EAN-13 must be 12 digits.');
    }

    return EAN13BarcodeGenerator.generateSVG(data);
  }
}

export default EAN13BarcodeGenerator;