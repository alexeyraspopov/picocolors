# picocolors

    npm install picocolors

A tinier and faster alternative to [nanocolors](https://github.com/ai/nanocolors). Andrey, are you even trying?

```javascript
import pc from "picocolors";

console.log(pc.green(`How are ${pc.italic(`you`)} doing?`));
```

- Up to [2x faster and 2x smaller](#benchmarks) than alternatives
- 3x faster and 10x smaller than `chalk`
- [TypeScript](https://www.typescriptlang.org/) support
- [`NO_COLOR`](https://no-color.org/) friendly
- Node.js v6+ & browsers support
- The same API, but faster, much faster
- No `String.prototype` modifications (anyone still doing it?)
- No dependencies and the smallest `node_modules` footprint

## Prior Art

Credits go to the following projects:

- [Nanocolors](https://github.com/ai/nanocolors) by [@ai](https://github.com/ai)
- [Colorette](https://github.com/jorgebucaran/colorette) by [@jorgebucaran](https://github.com/jorgebucaran)
- [Kleur](https://github.com/lukeed/kleur) by [@lukeed](https://github.com/lukeed)
- [Colors.js](https://github.com/Marak/colors.js) by [@Marak](https://github.com/Marak)
- [Chalk](https://github.com/chalk/chalk) by [@sindresorhus](https://github.com/sindresorhus)

## Usage

Picocolors provides an object which includes a variety of text coloring and formatting functions

```javascript
import pc from "picocolors";
```

The object includes following coloring functions: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`.

```javascript
console.log(`I see a ${pc.red("red door")} and I want it painted ${pc.black("black")}`);
```

The object also includes following background color modifier functions: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`.

```javascript
console.log(
  pc.bgBlack(
    pc.white(`Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush.`)
  )
);
```

Besides colors, the object includes following formatting functions: `dim`, `bold`, `hidden`, `italic`, `underline`, `strikethrough`, `reset`, `inverse`.

```javascript
for (let task of tasks) {
  console.log(`${pc.bold(task.name)} ${pc.dim(task.durationMs + "ms")}`);
}
```

The library provides additional utilities to ensure the best results for the task:

- `isColorSupported` — boolean, explicitly tells whether or not the colors or formatting appear on the screen

  ```javascript
  import pc from "picocolors";

  if (pc.isColorSupported) {
    console.log("Yay! This script can use colors and formatters");
  }
  ```

- `createColors(enabled)` — a function that returns a new API object with manually defined color support configuration

  ```javascript
  import pc from "picocolors";

  let { red, bgWhite } = pc.createColors(options.enableColors);
  ```

## Benchmarks

`nanocolors` [benchmark](https://github.com/ai/nanocolors/tree/main/test):

```diff
./test/size.js
Data from packagephobia.com
chalk         101 kB
cli-color    1249 kB
ansi-colors    25 kB
kleur          21 kB
colorette      16 kB
nanocolors     16 kB
+picocolors     8 kB
```

```diff
$ ./test/complex-benchmark.js
chalk          2,618,824 ops/sec
cli-color        326,445 ops/sec
ansi-colors    1,057,188 ops/sec
kleur          2,543,659 ops/sec
kleur/colors   2,841,679 ops/sec
colorette      3,219,038 ops/sec
nanocolors     3,672,600 ops/sec
+picocolors    6,079,950 ops/sec
```

`colorette` [benchmark](https://github.com/jorgebucaran/colorette/tree/main/bench):

```diff
$ npm start
+picocolors × 1,203,773 ops/sec
chalk × 474,359 ops/sec
kleur × 482,915 ops/sec
colors × 233,138 ops/sec
colorette × 657,896 ops/sec
nanocolors × 660,817 ops/sec
ansi-colors × 290,986 ops/sec
```
