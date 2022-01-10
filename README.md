# ramdacase

[![NPM](https://nodei.co/npm/ramdacase.png)](https://nodei.co/npm/ramdacase/)

Go beyond `toUpper` with these additional text transform functions based on Ramda.

Requires [ramda](https://ramdajs.com/) as a peer dependency.

## Install

`npm install --save ramda ramdacase`

## Usage

```typescript
import * as RC from "ramdacase";

const s = "The quick, brown, fox...";

// Convert to other case styles.
// (splits on whitespace, dashes, underscores, periods, & commas)
RC.toCamel(s); // "theQuickBrownFox"
RC.toPascal(s); // "TheQuickBrownFox"
RC.toKebab(s); // "The-quick-brown-fox"
RC.toKebabUpper(s); // "THE-QUICK-BROWN-FOX"
RC.toSnake(s); // "The_quick_brown_fox"
RC.toSnakeUpper(s); // "THE_QUICK_BROWN_FOX"
RC.toDot(s); // "The.quick.brown.fox"
RC.toSlash(s); // "The/quick/brown/fox"

// Use custom delimiter...
const toBreadcrumbCase = RC.toCase(" > ");
toBreadcrumbCase(s); // "The > quick > brown > fox"

RC.capitalize("the quick, brown..."); // "The quick, brown..."
RC.uncapitalize("The quick, brown..."); // "the quick, brown..."

// Only split words without rejoining them
RC.toWords(s); // ["The", "quick", "brown", "fox"]

// Split based on any delimiters...
RC.splitByAll(["&", "="])("id=1&name=mims"); // ["id", "1", "name", "mims"]
RC.splitByAll([" ", ",", "[", "]"])("[[1, 4, 7], [2, 5, 8], [3, 6, 9]]");
// ["1", "4", "7", "2", "5", "8", "3", "6", "9"]
```

_Below this line is boilerplate from TSDX_

=====

## Library bootstrapped with TSDX

For more info, see [tsdx.io](https://tsdx.io/)

## Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

You can also use `yarn test --watch` or `yarn test --coverage`

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log("foo");
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).
