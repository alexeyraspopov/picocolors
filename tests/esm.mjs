import pc from "../picocolors.mjs"
import { bold, createColors } from "../picocolors.mjs"
import assert from "node:assert"

test("import all", () => {
	assert.equal(typeof pc, "object")
	assert.equal(typeof pc.bold, "function")
	assert.equal(typeof pc.createColors, "function")
})

test("import bold", () => {
	assert.equal(typeof bold, "function")
})

test("import createColors", () => {
	assert.equal(typeof createColors, "function")
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
