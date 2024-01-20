import { convertBinaryStringToArray, convertToGroupedPairs, generateSimpleSvg1D } from '../utils';

export default class EAN13 {
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
      .map((digit) => this.LEFT_PARITY[digit])
      .join('');

    const rightParity = rightDigits
      .split('')
      .map((digit) => this.RIGHT_PARITY[digit])
      .join('');

    return leftParity + this.MIDDLE_MARKER + rightParity;
  }

  private static generateBinaryRepresentation(data: string): string {
    const parityData = this.calculateParity(data);
    return (
      this.START_MARKER +
      parityData +
      this.END_MARKER
    );
  }

  public static generate(data: string): string {
    const binaryRepresentation = this.generateBinaryRepresentation(data);
    const arrayRepresentation = convertBinaryStringToArray(binaryRepresentation);
    const groupedPairs = convertToGroupedPairs(arrayRepresentation);
    const svg = generateSimpleSvg1D(groupedPairs);
    return svg;
  }

  static generateEAN13Barcode(data: string): string {
    if (!/^0?\d{12}$/.test(data)) {
      throw new Error('EAN-13 must be 12 digits.');
    }
    return this.generate(data);
  }

}

