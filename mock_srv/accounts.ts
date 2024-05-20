import { genRandomNumber } from './misc'

const accounts: Account[] = [
	{ account_id: 1, name: 'Checking', description: 'Huntington' },
	{ account_id: 2, name: 'Credit', description: null },
]

export function getAccounts(): Promise<Account[]> {
	const delay = genRandomNumber(500, 3000)
	return new Promise((resolve) => {
		const thisInterval = setInterval(() => {
			clearInterval(thisInterval)
			resolve(accounts)
		}, delay)
	})
}
