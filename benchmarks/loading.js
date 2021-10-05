#!/usr/bin/env node

let { execSync } = require("child_process")

let RUNS = 50

let results = {}

for (let i = 0; i < RUNS; i++) {
	let output = execSync("node ./benchmarks/loading-runner.js").toString()
	output
		.trim()
		.split("\n")
		.forEach(line => {
			let [name, result] = line.split(" ")
			results[name] = (results[name] || 0) + parseFloat(result)
		})
}

for (let name in results) {
	let prefix = name === "picocolors" ? "+ " : "  "
	let title = name.padEnd("kleur/colors  ".length)
	let time = (Math.round((1000 * results[name]) / RUNS) / 1000)
		.toString()
		.replace(/\.\d$/, "$&00")
		.replace(/\.\d\d$/, "$&0")
	process.stdout.write(prefix + title + "\x1B[1m" + time.padStart(6) + "\x1B[22m ms\n")
}
