import { performance } from "perf_hooks"

let before
function showTime(name) {
	let after = performance.now()
	process.stdout.write(name + " " + (after - before) + "\n")
}

before = performance.now()
let chalk5 = await import("./chalk5.js")
showTime("chalk5")

before = performance.now()
let chalk4 = await import("chalk4")
showTime("chalk4")

before = performance.now()
let cliColor = await import("cli-color")
showTime("cli-color")

before = performance.now()
let ansi = await import("ansi-colors")
showTime("ansi-colors")

before = performance.now()
let kleur = await import("kleur")
showTime("kleur")

before = performance.now()
let kleurColors = await import("kleur/colors")
showTime("kleur/colors")

before = performance.now()
let colorette = await import("colorette")
showTime("colorette")

before = performance.now()
let nanocolors = await import("nanocolors")
showTime("nanocolors")

before = performance.now()
let yoctocolors = await import("./yoctocolors.js")
showTime("yoctocolors")

before = performance.now()
let picocolors = await import("../picocolors.js")
showTime("picocolors")
