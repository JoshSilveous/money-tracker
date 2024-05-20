import { genRandomNumber } from './misc'

const categories: Category[] = [
	{ category_id: 1, name: 'Food', description: 'yum yum' },
	{ category_id: 2, name: 'Gas', description: null },
	{ category_id: 3, name: 'Rent', description: null },
]

export function getCategories(): Promise<Category[]> {
	const delay = genRandomNumber(500, 3000)
	return new Promise((resolve) => {
		const thisInterval = setInterval(() => {
			clearInterval(thisInterval)
			resolve(categories)
		}, delay)
	})
}
