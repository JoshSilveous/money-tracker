export function formatDate(date: Date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

export function createDate(date: string) {
	const splittedDate = date.split('-').map((val) => parseInt(val))
	return new Date(splittedDate[0], splittedDate[1] - 1, splittedDate[2])
}
