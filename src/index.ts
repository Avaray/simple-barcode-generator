import EAN13 from './barcode-types/EAN13';
import QR from './barcode-types/QR';
import CODE128 from './barcode-types/CODE128';

type CodeTypes = 'EAN13' | 'QR' | 'CODE128';

export default class TsBarcodeGenerator {
  public static generate(code: string, type: CodeTypes): string {
    switch (type) {
      case 'EAN13':
        return EAN13.generate(code);
      case 'QR':
        return 'Not implemented yet';
      // return QR.generate(code);
      case 'CODE128':
        return 'Not implemented yet';
      default:
        throw new Error(`Unsupported barcode type: ${type}`);
    }
  }
}
