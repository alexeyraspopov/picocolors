# picocolors

The tiniest and the fastest library for terminal output formatting with ANSI colors.

```javascript
import pc from "picocolors"

console.log(
  pc.green(`How are ${pc.italic(`you`)} doing?`)
)
```

- **No dependencies.**
- **14 times** smaller and **2 times** faster than chalk.
- Used by popular tools like PostCSS, SVGO, Stylelint, and Browserslist.
- Node.js v6+ & browsers support. Support for both CJS and ESM projects.
- TypeScript type declarations included.
- [`NO_COLOR`](https://no-color.org/) friendly.

## Motivation

With `picocolors` we are trying to draw attention to the `node_modules` size
problem and promote performance-first culture.

## Prior Art

Credits go to the following projects:

- [Nanocolors](https://github.com/ai/nanocolors) by [@ai](https://github.com/ai)
- [Colorette](https://github.com/jorgebucaran/colorette) by [@jorgebucaran](https://github.com/jorgebucaran)
- [Kleur](https://github.com/lukeed/kleur) by [@lukeed](https://github.com/lukeed)
- [Colors.js](https://github.com/Marak/colors.js) by [@Marak](https://github.com/Marak)
- [Chalk](https://github.com/chalk/chalk) by [@sindresorhus](https://github.com/sindresorhus)

## Benchmarks

The space in node_modules including sub-dependencies:

```diff
$ node ./benchmarks/size.js
Data from packagephobia.com
  chalk       101 kB
  cli-color  1249 kB
  ansi-colors  25 kB
  kleur        21 kB
  colorette    17 kB
  nanocolors   16 kB
+ picocolors    7 kB
```

Library loading time:

```diff
$ node ./benchmarks/loading.js
  chalk          6.760 ms
  cli-color     37.949 ms
  ansi-colors    1.790 ms
  kleur          2.278 ms
  kleur/colors   0.858 ms
  colorette      2.724 ms
  nanocolors     0.885 ms
+ picocolors     0.470 ms
```

Benchmark for simple use case:

```diff
$ node ./benchmarks/simple.js
  chalk         17,544,513 ops/sec
  cli-color        808,186 ops/sec
  ansi-colors    3,798,290 ops/sec
  kleur         17,209,612 ops/sec
  kleur/colors  29,425,416 ops/sec
  colorette     30,236,826 ops/sec
  nanocolors    29,618,223 ops/sec
+ picocolors    29,514,102 ops/sec
```

Benchmark for complex use cases:

```diff
$ node ./benchmarks/complex.js
  chalk            856,888 ops/sec
  cli-color        109,678 ops/sec
  ansi-colors      306,752 ops/sec
  kleur            568,643 ops/sec
  kleur/colors     984,151 ops/sec
  colorette      1,337,991 ops/sec
  nanocolors     1,088,193 ops/sec
+ picocolors     1,772,265 ops/sec
```

## Usage

Picocolors provides an object which includes a variety of text coloring and formatting functions

```javascript
import pc from "picocolors"
```

The object includes following coloring functions: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`.

```javascript
console.log(`I see a ${pc.red("red door")} and I want it painted ${pc.black("black")}`)
```

The object also includes following background color modifier functions: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`.

```javascript
console.log(
  pc.bgBlack(
    pc.white(`Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush.`)
  )
)
```

Besides colors, the object includes following formatting functions: `dim`, `bold`, `hidden`, `italic`, `underline`, `strikethrough`, `reset`, `inverse`.

```javascript
for (let task of tasks) {
  console.log(`${pc.bold(task.name)} ${pc.dim(task.durationMs + "ms")}`)
}
```

The library provides additional utilities to ensure the best results for the task:

- `isColorSupported` — boolean, explicitly tells whether or not the colors or formatting appear on the screen

  ```javascript
  import pc from "picocolors"

  if (pc.isColorSupported) {
    console.log("Yay! This script can use colors and formatters")
  }
  ```

- `createColors(enabled)` — a function that returns a new API object with manually defined color support configuration

  ```javascript
  import pc from "picocolors"

  let { red, bgWhite } = pc.createColors(options.enableColors)
  ```

## Replacing `chalk`

1. Replace package name in import:

   ```diff
   - import chalk from 'chalk'
   + import pico from 'picocolors'
   ```

2. Replace variable:

   ```diff
   - chalk.red(text)
   + pico.red(text)
   ```

3. Replace chains to nested calls:

   ```diff
   - chalk.red.bold(text)
   + pico.red(pico.bold(text))
   ```

4. You can use [`colorize-template`](https://github.com/usmanyunusov/colorize-template)
   to replace chalk’s tagged template literal.

   ```diff
   + import { createColorize } from 'colorize-template'

   + let colorize = createColorize(pico)
   - chalk.red.bold`full {yellow ${"text"}}`
   + colorize`{red.bold full {yellow ${"text"}}}`
   ```
