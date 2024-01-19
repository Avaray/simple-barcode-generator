# SVG Barcode Generator written in TypeScript

Simple [barcode](https://en.wikipedia.org/wiki/Barcode) generator for frameworks like [React](https://react.dev/), [Preact](https://preactjs.com/), [Qwik](https://qwik.builder.io/), [Svelte](https://svelte.dev/), etc. Created to be lightweight and easy to use.

## Why to use this library

- Creates responsive [SVG](https://en.wikipedia.org/wiki/SVG) graphics.
- Is [TailwindCSS](https://tailwindcss.com/) friendly (you can easily apply colors).
- Is Dependency-free

## Idea

There was no browser API that I could use for generating simple 1D/2D barcodes in my projects. Among the libraries available on [NPM](https://www.npmjs.com/), I found only one decent library that is written in pure JavaScript - [bwip-js](https://github.com/metafloor/bwip-js), which have no [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). Bundled in my [Vite](https://vitejs.dev/) project it takes over 200 kilobytes [Gzipped](https://en.wikipedia.org/wiki/Gzip).

So, as part of my [TypeScript](https://www.typescriptlang.org/) learning journey (and programming in general), I decided to see if I could create such a generator with the help of [ChatGPT](https://chat.openai.com) and [GitHub Copilot](https://github.com/features/copilot). At the beginning, I will focus on the most important types of codes for me: [EAN13](https://en.wikipedia.org/wiki/International_Article_Number) and [QR](https://en.wikipedia.org/wiki/QR_code).

## Supported code formats

- EAN13 (Work in progess)

## Planned code formats

- QR

## Support

If you see potential in this project and want to help - feel free to join. Any help is welcome. You can contact me on Discord - **Avaray#7534**.
