import ean13 from "./barcode-types/ean_13.ts";
import code128 from "./barcode-types/code_128.ts";
import code93 from "./barcode-types/code_93.ts";
import code39 from "./barcode-types/code_39.ts";

type CodeTypes = "upc_a" | "ean_13" | "code_128" | "code_93" | "code_39";

export default class TsBarcodeGenerator {
  public static generate(code: string, type: CodeTypes): string {
    switch (type) {
      case "upc_a":
      case "ean_13":
        return ean13.generate(code);
      case "code_128":
        return code128.generate(code);
      case "code_93":
        return code93.generate(code);
      case "code_39":
        return code39.generate(code);
      default:
        throw new Error(`Unsupported barcode type: ${type}`);
    }
  }
}
