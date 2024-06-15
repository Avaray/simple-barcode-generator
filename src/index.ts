import EAN13 from './barcode-types/EAN13';

type CodeTypes = 'EAN13' | 'UPC';

export default class TsBarcodeGenerator {
  public static generate(code: string, type: CodeTypes): string {
    switch (type) {
      case 'EAN13':
      case 'UPC':
        return EAN13.generate(code);
      default:
        throw new Error(`Unsupported barcode type: ${type}`);
    }
  }
}
