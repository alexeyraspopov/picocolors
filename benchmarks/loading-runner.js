let { performance } = require("perf_hooks")
let { execSync } = require("child_process")

let path
let before
let baseline
function showTime(name) {
	let after = performance.now()
	process.stdout.write(name + " " + (after - before - baseline) + "\n")
}

let startBaseline = performance.now()
execSync('node --eval ""')
baseline = performance.now() - startBaseline

path = require.resolve("chalk")
before = performance.now()
load(path)
showTime("chalk")

path = require.resolve("cli-color")
before = performance.now()
load(path)
showTime("cli-color")

path = require.resolve("ansi-colors")
before = performance.now()
load(path)
showTime("ansi-colors")

path = require.resolve("kleur")
before = performance.now()
load(path)
showTime("kleur")

path = require.resolve("kleur/colors")
before = performance.now()
load(path)
showTime("kleur/colors")

path = require.resolve("colorette")
before = performance.now()
load(path)
showTime("colorette")

path = require.resolve("nanocolors")
before = performance.now()
load(path)
showTime("nanocolors")

path = require.resolve("../picocolors.js")
before = performance.now()
load(path)
showTime("picocolors")

function load(path) {
	execSync(`node --eval 'require("${path}")'`)
}
