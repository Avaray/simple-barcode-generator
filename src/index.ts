import ean_13 from "./barcode-types/ean_13.ts";
import ean_8 from "./barcode-types/ean_8.ts";
import code_128 from "./barcode-types/code_128.ts";
import code_93 from "./barcode-types/code_93.ts";
import code_39 from "./barcode-types/code_39.ts";

type CodeTypes = "upc_a" | "ean_13" | "ean_8" | "code_128" | "code_93" | "code_39";

export default class TsBarcodeGenerator {
  public static generate(code: string, type: CodeTypes): string {
    switch (type) {
      case "upc_a":
      case "ean_13":
        return ean_13.generate(code);
      case "ean_8":
        return ean_8.generate(code);
      case "code_128":
        return code_128.generate(code);
      case "code_93":
        return code_93.generate(code);
      case "code_39":
        return code_39.generate(code);
      default:
        throw new Error(`Unsupported barcode type: ${type}`);
    }
  }
}
