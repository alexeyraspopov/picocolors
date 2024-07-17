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

console.log(colorette.green("colorette"))
console.log(kleur.green("kleur"))
console.log(chalk.green("chalk"))
console.log(ansi.green("ansi"))
console.log(cliColor.green("cliColor"))
console.log(picocolors.green("picocolors"))
console.log(nanocolors.green("nanocolors"))

const bench = new Bench()

bench
	.add("chalk", () => {
		chalk.red("Add plugin to use time limit")
	})
	.add("cli-color", () => {
		cliColor.red("Add plugin to use time limit")
	})
	.add("ansi-colors", () => {
		ansi.red("Add plugin to use time limit")
	})
	.add("kleur", () => {
		kleur.red("Add plugin to use time limit")
	})
	.add("kleur/colors", () => {
		kleurColors.red("Add plugin to use time limit")
	})
	.add("colorette", () => {
		colorette.red("Add plugin to use time limit")
	})
	.add("nanocolors", () => {
		nanocolors.red("Add plugin to use time limit")
	})
	.add("yoctocolors", () => {
		yoctocolors.red("Add plugin to use time limit")
	})
	.add("picocolors", () => {
		picocolors.red("Add plugin to use time limit")
	})

await bench.warmup()
await bench.run()

console.table(bench.table())
