import { convertBinaryStringToArray, convertToPairs, generateSimpleSvg1D } from '../utils';

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

  private static Generate(data: string): string {
    const binaryRepresentation = this.generateBinaryRepresentation(data);
    const arrayRepresentation = convertBinaryStringToArray(binaryRepresentation);
    const groupedPairs = convertToPairs(arrayRepresentation);
    const svg = generateSimpleSvg1D(groupedPairs);
    return svg;
  }

  public static generate(data: string): string {
    if (!this.validate(data)) throw new Error("Invalid EAN-13 barcode");
    return this.Generate(data);
  }

  public static validate(data: string): boolean {
    if (!/^\d{12,13}$/.test(data)) return false;
    data = data.length === 12 ? `0${data}` : data;
    const digits = data.split('').map(Number);
    const checksum = this.calculateChecksum(digits.slice(0, 12));
    return checksum === digits[12];
  }

  private static calculateChecksum(digits: number[]): number {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * (i % 2 === 0 ? 1 : 3);
    }
    const mod = sum % 10;
    return mod === 0 ? 0 : 10 - mod;
  }

}
