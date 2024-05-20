import { genRandomNumber } from '.'

/*
const accounts: Account[] = [
	{ account_id: 1, name: 'Checking', description: 'Huntington' },
	{ account_id: 2, name: 'Credit', description: null },
]
const categories: Category[] = [
	{ category_id: 1, name: 'Food', description: 'yum yum' },
	{ category_id: 2, name: 'Gas', description: null },
	{ category_id: 3, name: 'Rent', description: null },
]
*/
const transactions: Transaction[] = [
	{
		transaction_id: 1,
		name: 'McDonalds',
		category_id: 1,
		account_id: 2,
		amount: 13.99,
		date: new Date(2024, 4, 18),
	},
	{
		transaction_id: 2,
		name: 'Circle K',
		category_id: 2,
		account_id: 2,
		amount: 42.35,
		date: new Date(2024, 4, 18),
	},
	{
		transaction_id: 3,
		name: 'Venmo Mom Rent',
		category_id: 3,
		account_id: 1,
		amount: 100.0,
		date: new Date(2024, 4, 18),
	},
	{
		transaction_id: 4,
		name: 'Kroger',
		category_id: 1,
		account_id: 2,
		amount: 75.22,
		date: new Date(2024, 4, 19),
	},
	{
		transaction_id: 5,
		name: 'Panera',
		category_id: 1,
		account_id: 2,
		amount: 11.99,
		date: new Date(2024, 4, 19),
	},
	{
		transaction_id: 6,
		name: 'Transfer',
		category_id: null,
		account_id: 1,
		amount: -300,
		date: new Date(2024, 4, 20),
	},
	{
		transaction_id: 7,
		name: 'Panera',
		category_id: null,
		account_id: 2,
		amount: 300,
		date: new Date(2024, 4, 20),
	},
]

export function getTransactions(): Promise<Transaction[]> {
	const delay = genRandomNumber(500, 3000)
	return new Promise((resolve) => {
		const thisInterval = setInterval(() => {
			clearInterval(thisInterval)
			resolve(transactions)
		}, delay)
	})
}
