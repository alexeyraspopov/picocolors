const { performance } = require("perf_hooks")

let before
function showTime(name) {
	let after = performance.now()
	process.stdout.write(name + " " + (after - before) + "\n")
}

before = performance.now()
let chalk5 = require("./chalk5")
showTime("chalk5")

before = performance.now()
let chalk4 = require("chalk4")
showTime("chalk4")

before = performance.now()
let cliColor = require("cli-color")
showTime("cli-color")

before = performance.now()
let ansi = require("ansi-colors")
showTime("ansi-colors")

before = performance.now()
let kleur = require("kleur")
showTime("kleur")

before = performance.now()
let kleurColors = require("kleur/colors")
showTime("kleur/colors")

before = performance.now()
let colorette = require("colorette")
showTime("colorette")

before = performance.now()
let nanocolors = require("nanocolors")
showTime("nanocolors")

before = performance.now()
let yoctocolors = require("./yoctocolors")
showTime("yoctocolors")

before = performance.now()
let picocolors = require("../picocolors.js")
showTime("picocolors")
