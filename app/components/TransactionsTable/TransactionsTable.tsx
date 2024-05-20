'use client'
import { useEffect, useState } from 'react'
import styles from './TransactionsTable.module.scss'
import { getAccounts, getCategories, getTransactions } from '@/mock_srv'
import { JGrid, JGridProps } from '../JGrid/JGrid'
import { formatDate } from '@/app/util/formatDate'

export function TransactionsTable() {
	interface DataState {
		transactions: Transaction[]
		categories: Category[]
		accounts: Account[]
	}
	const [data, setData] = useState<DataState>()

	useEffect(() => {
		Promise.all([getTransactions(), getCategories(), getAccounts()]).then((res) => {
			console.log(res)
			setData({
				transactions: res[0],
				categories: res[1],
				accounts: res[2],
			})
		})
	}, [])

	if (data === undefined) {
		return <div>Loading...</div>
	}
	// beyond this point, data has been loaded

	const columnTitles = ['Date', 'ID', 'Name', 'Category', 'Account', 'Amount']
	const defaultColumnWidths = ['150px', '50px', '150px', '150px', '150px', '100px']

	const columnHeaderElems = columnTitles.map((title) => (
		<div className={styles.header}>{title}</div>
	))
	// yyyy-mm-dd
	const transactionsElems = data.transactions.map((transaction) => {
		const formattedDate = formatDate(transaction.date)

		const categoryDropdown = (
			<select
				data-key='category_id'
				defaultValue={transaction.category_id === null ? '' : transaction.category_id}
			>
				<option value='' />
				{data!.categories.map((category) => {
					return <option value={category.category_id}>{category.name}</option>
				})}
			</select>
		)

		const accountDropdown = (
			<select
				data-key='account_id'
				defaultValue={transaction.account_id === null ? '' : transaction.account_id}
			>
				<option value='' />
				{data!.accounts.map((account) => {
					return <option value={account.account_id}>{account.name}</option>
				})}
			</select>
		)

		return [
			<input data-key='date' type='date' defaultValue={formattedDate} />,
			<div data-key='transaction_id'>{transaction.transaction_id}</div>,
			<input data-key='name' type='text' defaultValue={transaction.name} />,
			categoryDropdown,
			accountDropdown,
			<input data-key='amount' type='number' defaultValue={transaction.amount} />,
		]
	})

	const jGridConfig: JGridProps = {
		headers: columnHeaderElems,
		content: transactionsElems,
		defaultColumnWidths: defaultColumnWidths,
	}

	return (
		<div>
			<JGrid {...jGridConfig} />
		</div>
	)
}
