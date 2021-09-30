import * as pc from "./picocolors.js";

let empty = Object.keys(pc).reduce((api, k) => {
	return Object.assign(api, { [k]: k === "isColorSupported" ? false : noop });
}, {});

export function createColors(enabled = pc.isColorSupported) {
	return enabled ? pc : empty;
}

function noop(v) {
	return v;
}
