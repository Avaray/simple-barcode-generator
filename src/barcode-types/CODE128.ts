import { convertBinaryStringToArray, convertToPairs, generateSimpleSvg1D } from "../utils.ts";

interface Code128Character {
  value: number;
  pattern: string;
}

class CODE128 {
  private static readonly CODE128_B: { [key: string]: Code128Character } = {
    " ": { value: 0, pattern: "11011001100" },
    "!": { value: 1, pattern: "11001101100" },
    '"': { value: 2, pattern: "11001100110" },
    "#": { value: 3, pattern: "10010011000" },
    "$": { value: 4, pattern: "10010001100" },
    "%": { value: 5, pattern: "10001001100" },
    "&": { value: 6, pattern: "10011001000" },
    "'": { value: 7, pattern: "10011000100" },
    "(": { value: 8, pattern: "10001100100" },
    ")": { value: 9, pattern: "11001001000" },
    "*": { value: 10, pattern: "11001000100" },
    "+": { value: 11, pattern: "11000100100" },
    ",": { value: 12, pattern: "10110011100" },
    "-": { value: 13, pattern: "10011011100" },
    ".": { value: 14, pattern: "10011001110" },
    "/": { value: 15, pattern: "10111001100" },
    "0": { value: 16, pattern: "10011101100" },
    "1": { value: 17, pattern: "10011100110" },
    "2": { value: 18, pattern: "11001110010" },
    "3": { value: 19, pattern: "11001011100" },
    "4": { value: 20, pattern: "11001001110" },
    "5": { value: 21, pattern: "11011100100" },
    "6": { value: 22, pattern: "11001110100" },
    "7": { value: 23, pattern: "11101101110" },
    "8": { value: 24, pattern: "11101001100" },
    "9": { value: 25, pattern: "11100101100" },
    ":": { value: 26, pattern: "11100100110" },
    ";": { value: 27, pattern: "11101100100" },
    "<": { value: 28, pattern: "11100110100" },
    "=": { value: 29, pattern: "11100110010" },
    ">": { value: 30, pattern: "11011011000" },
    "?": { value: 31, pattern: "11011000110" },
    "@": { value: 32, pattern: "11000110110" },
    "A": { value: 33, pattern: "10100011000" },
    "B": { value: 34, pattern: "10001011000" },
    "C": { value: 35, pattern: "10001000110" },
    "D": { value: 36, pattern: "10110001000" },
    "E": { value: 37, pattern: "10001101000" },
    "F": { value: 38, pattern: "10001100010" },
    "G": { value: 39, pattern: "11010001000" },
    "H": { value: 40, pattern: "11000101000" },
    "I": { value: 41, pattern: "11000100010" },
    "J": { value: 42, pattern: "10110111000" },
    "K": { value: 43, pattern: "10110001110" },
    "L": { value: 44, pattern: "10001101110" },
    "M": { value: 45, pattern: "10111011000" },
    "N": { value: 46, pattern: "10111000110" },
    "O": { value: 47, pattern: "10001110110" },
    "P": { value: 48, pattern: "11101110110" },
    "Q": { value: 49, pattern: "11010001110" },
    "R": { value: 50, pattern: "11000101110" },
    "S": { value: 51, pattern: "11011101000" },
    "T": { value: 52, pattern: "11011100010" },
    "U": { value: 53, pattern: "11011101110" },
    "V": { value: 54, pattern: "11101011000" },
    "W": { value: 55, pattern: "11101000110" },
    "X": { value: 56, pattern: "11100010110" },
    "Y": { value: 57, pattern: "11101101000" },
    "Z": { value: 58, pattern: "11101100010" },
    "[": { value: 59, pattern: "11100011010" },
    "\\": { value: 60, pattern: "11101111010" },
    "]": { value: 61, pattern: "11001000010" },
    "^": { value: 62, pattern: "11110001010" },
    "_": { value: 63, pattern: "10100110000" },
    "`": { value: 64, pattern: "10100001100" },
    "a": { value: 65, pattern: "10010110000" },
    "b": { value: 66, pattern: "10010000110" },
    "c": { value: 67, pattern: "10000101100" },
    "d": { value: 68, pattern: "10000100110" },
    "e": { value: 69, pattern: "10110010000" },
    "f": { value: 70, pattern: "10110000100" },
    "g": { value: 71, pattern: "10011010000" },
    "h": { value: 72, pattern: "10011000010" },
    "i": { value: 73, pattern: "10000110100" },
    "j": { value: 74, pattern: "10000110010" },
    "k": { value: 75, pattern: "11000010010" },
    "l": { value: 76, pattern: "11001010000" },
    "m": { value: 77, pattern: "11110111010" },
    "n": { value: 78, pattern: "11000010100" },
    "o": { value: 79, pattern: "10001111010" },
    "p": { value: 80, pattern: "10100111100" },
    "q": { value: 81, pattern: "10010111100" },
    "r": { value: 82, pattern: "10010011110" },
    "s": { value: 83, pattern: "10111100100" },
    "t": { value: 84, pattern: "10011110100" },
    "u": { value: 85, pattern: "10011110010" },
    "v": { value: 86, pattern: "11110100100" },
    "w": { value: 87, pattern: "11110010100" },
    "x": { value: 88, pattern: "11110010010" },
    "y": { value: 89, pattern: "11011011110" },
    "z": { value: 90, pattern: "11011110110" },
    "{": { value: 91, pattern: "11110110110" },
    "|": { value: 92, pattern: "10101111000" },
    "}": { value: 93, pattern: "10100011110" },
    "~": { value: 94, pattern: "10001011110" },
  };

  private static readonly START_CODE_B = "11010010000";
  private static readonly STOP_PATTERN = "1100011101011";

  static validateInput(data: string): void {
    if (!/^[\x20-\x7E]{1,80}$/.test(data)) {
      throw new Error(
        "Invalid CODE128-B characters. Only ASCII 32-126 are allowed.",
      );
    }
  }

  static calculateChecksum(data: string): number {
    let sum = 104; // Start Code B value
    data.split("").forEach((char, index) => {
      sum += this.CODE128_B[char].value * (index + 1);
    });
    return sum % 103;
  }

  static generateBinary(data: string): string {
    this.validateInput(data);

    const checksum = this.calculateChecksum(data);
    const checksumChar = Object.entries(this.CODE128_B).find(([, { value }]) => value === checksum)?.[1].pattern;

    if (!checksumChar) {
      throw new Error("Failed to find checksum character");
    }

    let binary = this.START_CODE_B;

    for (const char of data) {
      binary += this.CODE128_B[char].pattern;
    }

    binary += checksumChar;
    binary += this.STOP_PATTERN;

    return binary;
  }

  static generate(data: string): string {
    const binary = this.generateBinary(data);
    const array = convertBinaryStringToArray(binary);
    const pairs = convertToPairs(array);
    return generateSimpleSvg1D(pairs);
  }
}

export default CODE128;
