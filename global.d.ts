interface Transaction {
	transaction_id: number
	name: string
	category_id: number | null
	account_id: number | null
	amount: number
	date: Date
}

interface Category {
	category_id: number
	name: string
	description: string | null
}

interface Account {
	account_id: number
	name: string
	description: string | null
}
