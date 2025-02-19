import EAN13 from "./barcode-types/EAN13.ts";
import CODE128 from "./barcode-types/CODE128.ts";
import CODE39 from "./barcode-types/CODE39.ts";

type CodeTypes = "EAN13" | "UPC" | "CODE128" | "CODE39";

export default class TsBarcodeGenerator {
  public static generate(code: string, type: CodeTypes): string {
    switch (type) {
      case "EAN13":
      case "UPC":
        return EAN13.generate(code);
      case "CODE128":
        return CODE128.generate(code);
      case "CODE39":
        return CODE39.generate(code);
      default:
        throw new Error(`Unsupported barcode type: ${type}`);
    }
  }
}
