interface Transaction {
	transaction_id: number
	name: string
	category_id: number
	account_id: number
	amount: number
	date: Date
}

interface Category {
	category_id: number
	name: string
	description?: string
}

interface Account {
	account_id: number
	name: string
	description?: string
}
