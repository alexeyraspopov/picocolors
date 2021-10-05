#!/usr/bin/env node

let { get } = require("https")

let { bold, gray } = require("../picocolors.js")

async function getJSON(url) {
	return new Promise(resolve => {
		get(url, res => {
			let text = ""
			res.on("data", chunk => {
				text += chunk
			})
			res.on("end", () => {
				resolve(JSON.parse(text))
			})
		})
	})
}

async function benchmark(lib) {
	let data = await getJSON(`https://packagephobia.com/v2/api.json?p=${lib}`)
	let size = data.install.bytes
	process.stdout.write(
		lib.padEnd("ansi-colors  ".length) +
			bold(
				Math.round(size / 1024)
					.toString()
					.padStart(4)
			) +
			" kB\n"
	)
}

async function start() {
	process.stdout.write(gray("Data from packagephobia.com\n"))
	await benchmark("  chalk")
	await benchmark("  cli-color")
	await benchmark("  ansi-colors")
	await benchmark("  kleur")
	await benchmark("  colorette")
	await benchmark("  nanocolors")
	await benchmark("+ picocolors")
}

start()
