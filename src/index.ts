import EAN13 from './barcode-types/EAN13';
import CODE128 from './barcode-types/CODE128';

type CodeTypes = 'EAN13' | 'CODE128';

export default class TsBarcodeGenerator {
  public static generate(code: string, type: CodeTypes): string {
    switch (type) {
      case 'EAN13':
        return EAN13.generate(code);
      case 'CODE128':
        return CODE128.generate(code);
      default:
        throw new Error(`Unsupported barcode type: ${type}`);
    }
  }
}
