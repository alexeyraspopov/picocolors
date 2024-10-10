import { run, bench, group } from "mitata"
import { buildSync } from "esbuild"
import { createRequire } from "module"
import { dirname } from "path"
import { createContext, compileFunction } from "vm"

let filename = new URL(import.meta.url).pathname

function build(contents) {
	let root = dirname(filename)
	let result = buildSync({
		bundle: true,
		write: false,
		platform: "node",
		stdin: { contents, loader: "js", resolveDir: root },
	})
	let code = result.outputFiles[0].text
	return code
}

function compile(code, context) {
	return compileFunction(code, [], { parsingContext: context })
}

group(() => {
	let codeP = build(`let picocolors = require("../picocolors.js")`)
	let contextP = createContext({ require: createRequire(filename), process: { env: {} } })
	bench("picocolors", () => compile(codeP, contextP))

	let codeAC = build(`let ansi = require("ansi-colors")`)
	let contextAC = createContext({ require: createRequire(filename), process: { env: {} } })
	bench("ansi-colors", () => compile(codeAC, contextAC))

	let codeK = build(`let kleur = require("kleur")`)
	let contextK = createContext({ require: createRequire(filename), process: { env: {} } })
	bench("kleur", () => compile(codeK, contextK))

	let codeKC = build(`let kleurColors = require("kleur/colors")`)
	let contextKC = createContext({ require: createRequire(filename), process: { env: {} } })
	bench("kleur/colors", () => compile(codeKC, contextKC))

	let codeC = build(`let colorette = require("colorette")`)
	let contextC = createContext({ require: createRequire(filename), process: { env: {} } })
	bench("colorette", () => compile(codeC, contextC))

	let codeN = build(`let nanocolors = require("nanocolors")`)
	let contextN = createContext({ require: createRequire(filename), process: { env: {} } })
	bench("nanocolors", () => compile(codeN, contextN))

	let codeCh = build(`let chalk = require("chalk")`)
	let contextCh = createContext({ require: createRequire(filename), process: { env: {} } })
	bench("chalk", () => compile(codeCh, contextCh))

	let codeCC = build(`let cliColor = require("cli-color")`)
	let contextCC = createContext({ require: createRequire(filename), process: { env: {} } })
	bench("cli-color", () => compile(codeCC, contextCC))
})

await run()
