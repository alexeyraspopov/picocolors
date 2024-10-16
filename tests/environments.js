let vm = require("vm")
let fs = require("fs")
let pc = require("../picocolors.js")
let assert = require("assert")
let source = fs.readFileSync(__dirname + "/../picocolors.js", "utf-8")

test("ci server", () => {
	let pc = initModuleEnv({ env: { TERM: "dumb", CI: "1" } })
	assert.equal(pc.isColorSupported, true)
	assert.equal(pc.red("text"), pc.createColors(true).red("text"))
})

test("arg --color", () => {
	let pc = initModuleEnv({ env: { TERM: "dumb" }, argv: ["--color"] })
	assert.equal(pc.isColorSupported, true)
	assert.equal(pc.red("text"), pc.createColors(true).red("text"))
})

test("env NO_COLOR", () => {
	let pc = initModuleEnv({ env: { FORCE_COLOR: "1", NO_COLOR: "1" } })
	assert.equal(pc.isColorSupported, false)
	assert.equal(pc.red("text"), pc.createColors(false).red("text"))
})

test("env NO_COLOR empty", () => {
	let pc = initModuleEnv({ env: { NO_COLOR: "" } })
	assert.equal(pc.isColorSupported, true)
	assert.equal(pc.red("text"), pc.createColors(true).red("text"))
})

test("env FORCE_COLOR", () => {
	let pc = initModuleEnv({ env: { TERM: "dumb", FORCE_COLOR: "1" } })
	assert.equal(pc.isColorSupported, true)
	assert.equal(pc.red("text"), pc.createColors(true).red("text"))
})

test("arg --no-color", () => {
	let pc = initModuleEnv({ env: { FORCE_COLOR: "1" }, argv: ["--no-color"] })
	assert.equal(pc.isColorSupported, false)
	assert.equal(pc.red("text"), pc.createColors(false).red("text"))
})

test("no term", () => {
	let pc = initModuleEnv({ env: { TERM: "dumb" } })
	assert.equal(pc.isColorSupported, false)
	assert.equal(pc.red("text"), pc.createColors(false).red("text"))
})

test("windows", () => {
	let pc = initModuleEnv({ env: { TERM: "dumb" }, platform: "win32" })
	assert.equal(pc.isColorSupported, true)
	assert.equal(pc.red("text"), pc.createColors(true).red("text"))
})

test("edge runtime", () => {
	let pc = initModuleEnv({ env: { FORCE_COLOR: "1" }, argv: undefined, require: undefined })
	assert.equal(pc.isColorSupported, true)
	assert.equal(pc.red("text"), pc.createColors(true).red("text"))
})

function test(name, fn) {
	try {
		fn()
		console.log(pc.green("✓ " + name))
	} catch (error) {
		console.log(pc.red("✗ " + name))
		throw error
	}
}

function initModuleEnv({
	env,
	argv = [],
	platform = "darwin",
	require = global.require,
	stdout = process.stdout,
}) {
	let process = { env, argv, platform, stdout }
	let context = vm.createContext({ require, process, module: { exports: {} } })
	let script = new vm.Script(source)
	script.runInContext(context)
	return context.module.exports
}
