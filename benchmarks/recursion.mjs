#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

import {Bench} from "tinybench"
import * as colorette from "colorette"
import kleur from "kleur"
import * as kleurColors from "kleur/colors"
import chalk from "chalk"
import ansi from "ansi-colors"
import cliColor from "cli-color"
import picocolors from "../picocolors.js"
import * as nanocolors from "nanocolors"
import * as yoctocolors from "yoctocolors"

const bench = new Bench();
let count = 1000
let input = "lorem ipsum dolor sit amet"

bench
	.add("chalk", () => {
		chalk.blue(chalk.red(input).repeat(count))
	})
	.add("cli-color", () => {
		cliColor.blue(cliColor.red(input).repeat(count))
	})
	.add("ansi-colors", () => {
		ansi.blue(ansi.red(input).repeat(count))
	})
	.add("kleur", () => {
		kleur.blue(kleur.red(input).repeat(count))
	})
	.add("kleur/colors", () => {
		kleurColors.blue(kleurColors.red(input).repeat(count))
	})
	.add("colorette", () => {
		colorette.blue(colorette.red(input).repeat(count))
	})
	.add("nanocolors", () => {
		nanocolors.blue(nanocolors.red(input).repeat(count))
	})
	.add("yoctocolors", () => {
		yoctocolors.blue(yoctocolors.red(input).repeat(count))
	})
	.add("picocolors", () => {
		picocolors.blue(picocolors.red(input).repeat(count))
	})

await bench.warmup()
await bench.run()

console.table(bench.table())
