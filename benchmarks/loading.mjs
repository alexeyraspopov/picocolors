/* @prettier */
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
		format: "cjs",
		target: "es2020",
		stdin: { contents, loader: "js", resolveDir: root },
	})
	let code = result.outputFiles[0].text
	return code
}

function compile(code, context) {
	return compileFunction(code, [], { parsingContext: context })
}

group(() => {
	let codeP = build(
		`let picocolors = require("../picocolors.js"); console.log(picocolors != null);`
	)
	let contextP = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("picocolors", () => compile(codeP, contextP))

	let codeAC = build(`let ansi = require("ansi-colors"); console.log(ansi != null);`)
	let contextAC = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("ansi-colors", () => compile(codeAC, contextAC))

	let codeK = build(`let kleur = require("kleur"); console.log(kleur != null);`)
	let contextK = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("kleur", () => compile(codeK, contextK))

	let codeKC = build(`let kleurColors = require("kleur/colors"); console.log(kleurColors != null);`)
	let contextKC = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("kleur/colors", () => compile(codeKC, contextKC))

	let codeC = build(`let colorette = require("colorette"); console.log(colorette != null);`)
	let contextC = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("colorette", () => compile(codeC, contextC))

	let codeN = build(`let nanocolors = require("nanocolors"); console.log(nanocolors != null);`)
	let contextN = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("nanocolors", () => compile(codeN, contextN))

	let codeY = build(`import * as yoctocolors from "yoctocolors"; console.log(yoctocolors != null);`)
	let contextY = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("yoctocolors", () => compile(codeY, contextY))

	let codeCh = build(`let chalk = require("chalk"); console.log(chalk != null);`)
	let contextCh = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("chalk v4", () => compile(codeCh, contextCh))

	let codeCh5 = build(`import * as chalk5 from "chalk5"; console.log(chalk5 != null);`)
	let contextCh5 = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("chalk v5", () => compile(codeCh5, contextCh5))

	let codeCC = build(`let cliColor = require("cli-color")`)
	let contextCC = createContext({
		require: createRequire(filename),
		process: { env: { FORCE_COLOR: 1 } },
	})
	bench("cli-color", () => compile(codeCC, contextCC))
})

await run()
