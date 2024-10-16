/* @prettier */
import { run, bench, boxplot } from "mitata"

import * as colorette from "colorette"
import kleur from "kleur"
import * as kleurColors from "kleur/colors"
import chalk from "chalk"
import ansi from "ansi-colors"
import cliColor from "cli-color"
import picocolors from "../picocolors.js"
import * as nanocolors from "nanocolors"

console.log(colorette.green("colorette"))
console.log(kleur.green("kleur"))
console.log(chalk.green("chalk"))
console.log(ansi.green("ansi"))
console.log(cliColor.green("cliColor"))
console.log(picocolors.green("picocolors"))
console.log(nanocolors.green("nanocolors"))

boxplot(() => {
	bench("chalk", () => {
		return chalk.red("Add plugin to use time limit")
	})
	bench("cli-color", () => {
		return cliColor.red("Add plugin to use time limit")
	})
	bench("ansi-colors", () => {
		return ansi.red("Add plugin to use time limit")
	})
	bench("kleur", () => {
		return kleur.red("Add plugin to use time limit")
	})
	bench("kleur/colors", () => {
		return kleurColors.red("Add plugin to use time limit")
	})
	bench("colorette", () => {
		return colorette.red("Add plugin to use time limit")
	})
	bench("nanocolors", () => {
		return nanocolors.red("Add plugin to use time limit")
	})
	bench("picocolors", () => {
		return picocolors.red("Add plugin to use time limit")
	})
})

await run()
