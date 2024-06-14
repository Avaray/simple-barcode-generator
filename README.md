# SVG Barcode Generator written in TypeScript

Simple [barcode](https://en.wikipedia.org/wiki/Barcode) generator for frameworks like [React](https://react.dev/), [Preact](https://preactjs.com/), [Qwik](https://qwik.builder.io/), [Svelte](https://svelte.dev/), etc.  
Created to be lightweight and easy to use.

> Generated 1D barcodes can be resized freely horizontally and vertically. By default, they will take on the size of the parent element.
> 2D barcodes are scalable, preserve aspect ratio and their size depends on width of parent element.

## Why to use this library

- Creates responsive [SVG](https://en.wikipedia.org/wiki/SVG) graphics.
- Is [TailwindCSS](https://tailwindcss.com/) friendly (you can easily apply colors).
- Is Dependency-free

## Idea

There was no [browser API](https://caniuse.com/) that I could use for generating [1D/2D barcodes](https://en.wikipedia.org/wiki/Barcode#Types_of_barcodes) in my projects. Among the libraries available on [NPM](https://www.npmjs.com/), I found only one decent library that is written in pure JavaScript - [bwip-js](https://github.com/metafloor/bwip-js), which unfortunately does not have [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). Bundled in my [Vite](https://vitejs.dev/) project it takes about 230 kilobytes [Gzipped](https://en.wikipedia.org/wiki/Gzip).

So, as part of my [TypeScript](https://www.typescriptlang.org/) learning journey (and programming in general), I decided to see if I could create such a generator with the help of [ChatGPT](https://chat.openai.com) and [GitHub Copilot](https://github.com/features/copilot). At the beginning, I will focus on the most important types of codes for me: [EAN13](https://en.wikipedia.org/wiki/International_Article_Number) and [QR](https://en.wikipedia.org/wiki/QR_code).

# Usage

### Common

```ts
import TsBarcodeGenerator from 'ts-barcode-generator';

const barcode = TsBarcodeGenerator.generate('7423522549551', 'EAN13');

console.log(barcode);
```

### React/Preact + TailwindCSS

```ts
import TsBarcodeGenerator from 'ts-barcode-generator';

export const YourComponent = () => {
  const barcode = TsBarcodeGenerator.generate('7423522549551', 'EAN13');
  return (
    <div className='p-6 bg-white fill-current text-black'>
      <div dangerouslySetInnerHTML={{ __html: barcode }} />
    </div>
  );
};
```

## Supported code formats

- EAN13

## Planned code formats

- Simple 1D bardoces like UPC, Code 128, Code 39, etc.
- QR Code

## Materials you can check before use

- [Color Selection for Barcode Symbols](https://www.barcode.graphics/upc-color-guide)
- [Barcode Symbology](https://www.scandit.com/products/barcode-scanning/symbologies)
- [Wikipedia.org/Barcode](https://en.wikipedia.org/wiki/Barcode)

## Support the project

If you see potential in this project and want to help - feel free to contribute. Any help is welcome.

You can contact me on Discord: **Avaray#7534**  
You can find me on servers like: [Astro Lounge](https://discord.gg/astrodotbuild) (EN), [Anthony's](https://discord.gg/RPmzgZMT) (EN), [Programowanko TSH.io](https://discord.gg/BWh98tnZ6Y) (PL).
