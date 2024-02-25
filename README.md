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
  chalk@5.3.0  43 kB
  chalk@4.1.2 101 kB
  cli-color   796 kB
  ansi-colors  27 kB
  kleur        20 kB
  colorette    17 kB
  nanocolors   15 kB
  yoctocolors   7 kB
+ picocolors    7 kB
```

Library loading time:

```diff
$ node ./benchmarks/loading.js
  chalk5         7.713 ms
  chalk4         5.372 ms
  cli-color     32.428 ms
  ansi-colors    1.420 ms
  kleur          2.345 ms
  kleur/colors   0.960 ms
  colorette      0.887 ms
  nanocolors     0.708 ms
  yoctocolors    0.679 ms
+ picocolors     0.388 ms
```

Benchmark for simple use case:

```diff
$ node ./benchmarks/simple.js
  chalk5         26,287,893 ops/sec
  chalk4         25,221,564 ops/sec
  cli-color       1,412,525 ops/sec
  ansi-colors     6,463,786 ops/sec
  kleur          26,363,857 ops/sec
  kleur/colors   52,166,754 ops/sec
  colorette      50,574,214 ops/sec
  nanocolors     51,646,373 ops/sec
  yoctocolors   195,458,649 ops/sec
+ picocolors     50,840,902 ops/sec
```

Benchmark for complex use cases:

```diff
$ node ./benchmarks/complex.js
  chalk5          1,178,597 ops/sec
  chalk4          1,215,094 ops/sec
  cli-color         152,419 ops/sec
  ansi-colors       558,016 ops/sec
  kleur           1,251,816 ops/sec
  kleur/colors    1,523,289 ops/sec
  colorette       1,813,436 ops/sec
  nanocolors      1,682,924 ops/sec
  yoctocolors     4,424,045 ops/sec
+ picocolors      2,747,818 ops/sec
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
