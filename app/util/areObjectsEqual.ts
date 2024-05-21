export function areObjectsEqual(obj1: any, obj2: any): boolean {
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
		return false
	}

	const keys1 = Object.keys(obj1)
	const keys2 = Object.keys(obj2)

	if (keys1.length !== keys2.length) {
		return false
	}

	const doesntMatch = keys1.some((key) => {
		if (!keys2.includes(key)) {
			return true
		}
		if (obj1[key] !== obj2[key]) {
			return true
		}
		return false
	})

	return !doesntMatch
}
