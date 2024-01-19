import EAN13BarcodeGenerator from './ean13';

const barcodeData = '123456789012'; // 12-digit data

const barcodeSVG = EAN13BarcodeGenerator.generateEAN13Barcode(barcodeData);

console.log(barcodeSVG);
