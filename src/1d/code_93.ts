import { convertBinaryStringToArray, convertToPairs, generateSimpleSvg1D } from "../utils.ts";

export default class Code93 {
  private static readonly CHARACTER_ENCODINGS: { [key: string]: string } = {
    "0": "100010100",
    "1": "101001000",
    "2": "101000100",
    "3": "101000010",
    "4": "100101000",
    "5": "100100100",
    "6": "100100010",
    "7": "101010000",
    "8": "100010010",
    "9": "100001010",
    "A": "110101000",
    "B": "110100100",
    "C": "110100010",
    "D": "110010100",
    "E": "110010010",
    "F": "110001010",
    "G": "101101000",
    "H": "101100100",
    "I": "101100010",
    "J": "100110100",
    "K": "100011010",
    "L": "101011000",
    "M": "101001100",
    "N": "101000110",
    "O": "100101100",
    "P": "100010110",
    "Q": "110110100",
    "R": "110110010",
    "S": "110101100",
    "T": "110100110",
    "U": "110010110",
    "V": "110011010",
    "W": "101101100",
    "X": "101100110",
    "Y": "100110110",
    "Z": "100111010",
    "-": "100101110",
    ".": "111010100",
    " ": "111010010",
    "$": "111001010",
    "/": "101101110",
    "+": "101110110",
    "%": "110101110",
    "($)": "100100110",
    "(/)": "111011010",
    "(+)": "111010110",
    "(%)": "100110010",
    "*": "101011110", // Start/Stop character
  };

  static generate(data: string): string {
    if (!this.validate(data)) throw new Error("Invalid Code 93 characters");

    const formattedData = data.toUpperCase();
    const checksums = this.calculateChecksums(formattedData);
    const fullData = "*" + formattedData + checksums + "*"; // Add start/stop characters
    const binary = this.generateBinary(fullData);
    const array = convertBinaryStringToArray(binary);
    const pairs = convertToPairs(array);

    return generateSimpleSvg1D(pairs);
  }

  private static generateBinary(data: string): string {
    let binary = "";
    for (const char of data) {
      binary += this.CHARACTER_ENCODINGS[char] || "";
    }
    return binary + "1"; // Add termination bar
  }

  private static calculateChecksums(data: string): string {
    const chars = Object.keys(this.CHARACTER_ENCODINGS)
      .filter((char) => !["*", "($)", "(/)", "(+)", "(%)"].includes(char));

    // Calculate C checksum
    let sumC = 0;
    for (let i = 0; i < data.length; i++) {
      const weight = data.length - i;
      const charIndex = chars.indexOf(data[i]);
      sumC += weight * charIndex;
    }
    const c = chars[sumC % 47];

    // Calculate K checksum
    let sumK = 0;
    const dataWithC = data + c;
    for (let i = 0; i < dataWithC.length; i++) {
      const weight = dataWithC.length - i;
      const charIndex = chars.indexOf(dataWithC[i]);
      sumK += weight * charIndex;
    }
    const k = chars[sumK % 47];

    return c + k;
  }

  static validate(data: string): boolean {
    const validChars = new Set(
      Object.keys(this.CHARACTER_ENCODINGS)
        .filter((char) => !["*", "($)", "(/)", "(+)", "(%)"].includes(char)),
    );
    return data.toUpperCase().split("").every((char) => validChars.has(char));
  }
}
