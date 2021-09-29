#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

import benchmark from "benchmark";
import * as colorette from "colorette";
import kleur from "kleur";
import * as kleurColors from "kleur/colors";
import chalk from "chalk";
import ansi from "ansi-colors";
import cliColor from "cli-color";
import * as pen from "felt-pen";
import * as picocolors from "../picocolors.js";
import * as nanocolors from "nanocolors";

function formatNumber(number) {
  return String(number)
    .replace(/\d{3}$/, ",$&")
    .replace(/^(\d|\d\d)(\d{3},)/, "$1,$2");
}

const suite = new benchmark.Suite();
let out;

suite
  .add("chalk", () => {
    out = chalk.bgRed.black(" ERROR ") + chalk.red(" Add plugin to use time limit");
  })
  .add("cli-color", () => {
    out = cliColor.bgRed.black(" ERROR ") + cliColor.red(" Add plugin to use time limit");
  })
  .add("ansi-colors", () => {
    out = ansi.bgRed.black(" ERROR ") + ansi.red(" Add plugin to use time limit");
  })
  .add("kleur", () => {
    out = kleur.bgRed().black(" ERROR ") + kleur.red(" Add plugin to use time limit");
  })
  .add("kleur/colors", () => {
    out =
      kleurColors.bgRed(kleurColors.black(" ERROR ")) +
      kleurColors.red(" Add plugin to use time limit");
  })
  .add("colorette", () => {
    out =
      colorette.bgRed(colorette.black(" ERROR ")) + colorette.red(" Add plugin to use time limit");
  })
  .add("felt-pen", () => {
    out = pen.Red(" ERROR ") + pen.red(" Add plugin to use time limit");
  })
  .add("nanocolors", () => {
    out =
      nanocolors.bgRed(nanocolors.black(" ERROR ")) +
      nanocolors.red(" Add plugin to use time limit");
  })
  .add("picocolors", () => {
    out =
      picocolors.bgRed(picocolors.black(" ERROR ")) +
      picocolors.red(" Add plugin to use time limit");
  })
  .on("cycle", (event) => {
    const prefix = event.target.name === "picocolors" ? "+ " : "  ";
    const name = event.target.name.padEnd("kleur/colors  ".length);
    const hz = formatNumber(event.target.hz.toFixed(0)).padStart(10);
    process.stdout.write(`${prefix}${name}${picocolors.bold(hz)} ops/sec\n`);
  })
  .on("error", (event) => {
    process.stderr.write(picocolors.red(event.target.error.toString()) + "\n");
  })
  .run();
