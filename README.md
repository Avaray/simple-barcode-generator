# SVG Barcode Generator

Simple [barcode](https://en.wikipedia.org/wiki/Barcode) generator for frameworks like [React](https://react.dev/),
[Preact](https://preactjs.com/), [Vue](https://vuejs.org/), [Svelte](https://svelte.dev/), etc.\
Created to be lightweight, easy to use, and compatible with [Tailwind CSS](Tailwind).

## Why to use this library

- Creates responsive [SVG](https://en.wikipedia.org/wiki/SVG) graphics.
- Is [TailwindCSS](https://tailwindcss.com/) friendly (you can easily apply foreground and background colors).
- You can use it in the browser ([ES2017](https://caniuse.com/?search=es2017)) and in runtimes such as
  [Node](https://nodejs.org/), [Deno](https://deno.com/), and [Bun](https://bun.sh/).
- Is Dependency-free

## Why you shouldn't use this library

- Whether the project will be developed further depends on my willingness to work. **EAN13**, **UPC** and **CODE128**
  might be the only supported formats.
- It has not been battle-tested yet.

## Idea

Among the libraries available on [NPM](https://www.npmjs.com/), none met my needs. Some lacked
[tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), others required complex configurations
just to generate decent looking SVG, and some applied colors that couldn’t be easily overridden with Tailwind. So, I
decided to create my own library.

## Usage

#### Common

```ts
import TsBarcodeGenerator from "simple-barcode-generator";

const barcode = TsBarcodeGenerator.generate("7423522549551", "EAN13");

console.log(barcode);
```

#### React + TailwindCSS

```ts
import TsBarcodeGenerator from "simple-barcode-generator";

export const YourComponent = () => {
  const barcode = TsBarcodeGenerator.generate("7423522549551", "EAN13");
  return (
    <div className="p-6 bg-white fill-current text-black">
      <div dangerouslySetInnerHTML={{ __html: barcode }} />
    </div>
  );
};
```

## Supported code formats

- [EAN13](https://en.wikipedia.org/wiki/International_Article_Number)
- [UPC](https://en.wikipedia.org/wiki/Universal_Product_Code)
- [CODE128](https://en.wikipedia.org/wiki/Code_128)

## Materials you can check before use

- [Color Selection for Barcode Symbols](https://www.barcode.graphics/upc-color-guide)
- [Barcode Symbology](https://www.scandit.com/products/barcode-scanning/symbologies)
- [Wikipedia.org/Barcode](https://en.wikipedia.org/wiki/Barcode)

## Support the project

If you see potential in this project and want to help - feel free to contribute.

You can contact me on [LinkedIn](https://www.linkedin.com/in/wasowsky/) or Discord: `avaray_`
