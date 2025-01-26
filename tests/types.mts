import pc from "../picocolors.mjs"
import { bold, createColors, Colors } from "../picocolors.mjs"

test("default export", () => {
  let _result: string = pc.bold("test")
})

test("named exports", () => {
  let _result: string = bold("test")
})

test("factory function", () => {
  let _result1: Colors = pc.createColors()
  let _result2: Colors = createColors()
})

function test(name: string, fn: () => void) : void {
	try {
		fn()
		console.log(pc.green("✓ " + name))
	} catch (error) {
		console.log(pc.red("✗ " + name))
		throw error
	}
}
