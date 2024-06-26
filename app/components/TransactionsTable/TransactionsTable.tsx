'use client'
import { useEffect, useState } from 'react'
import styles from './TransactionsTable.module.scss'
import { getAccounts, getCategories, getTransactions } from '@/mock_srv'
import { JGrid, JGridProps } from '../JGrid/JGrid'
import { createDate, formatDate } from '@/app/util/formatDate'
import { areObjectsEqual } from '@/app/util/areObjectsEqual'
import { InputDollar } from '../custom_inputs'

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

	const [pendingChanges, setPendingChanges] = useState<Transaction[]>([])

	if (data === undefined) {
		return <div>Loading...</div>
	}
	console.log(pendingChanges)

	// beyond this point, data has been loaded

	const columnTitles = ['Date', 'ID', 'Name', 'Category', 'Account', 'Amount']
	const defaultColumnWidths = ['150px', '50px', '150px', '150px', '150px', '100px']

	const columnHeaderElems = columnTitles.map((title) => (
		<div className={styles.header}>{title}</div>
	))

	const transactionsElems = data.transactions.map((transaction) => {
		function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
			const changedKey = e.target.dataset['key'] as keyof Transaction
			let newVal: string | number = e.target.value

			if (
				changedKey === 'account_id' ||
				changedKey === 'category_id' ||
				changedKey === 'amount'
			) {
				newVal = parseFloat(newVal)
			}

			if (pendingChanges.length === 0) {
				setPendingChanges([{ ...transaction, [changedKey]: newVal }])
			} else {
				setPendingChanges((prev) => {
					const changes = [...prev!]
					const thisAlreadyInPendingChanges = prev!.some((changedTransaction, index) => {
						if (changedTransaction.transaction_id === transaction.transaction_id) {
							// check if this change undos all changes made to this transaction, and remove from pendingChanges if so
							if (newVal === transaction[changedKey]) {
								const changesHaveBeenReverted = areObjectsEqual(
									{ ...changes[index], [changedKey]: newVal },
									transaction
								)
								if (changesHaveBeenReverted) {
									changes.splice(index, 1)
									return true
								}
							}

							changes[index] = { ...changes[index], [changedKey]: newVal }
							return true
						}
						return false
					})
					if (!thisAlreadyInPendingChanges) {
						changes.push({ ...transaction, [changedKey]: newVal })
					}
					return changes
				})
			}
			console.log(
				`old: ${transaction[changedKey]} ${typeof transaction[
					changedKey
				]} new: ${newVal} ${typeof newVal} literal: ${e.target.value} parsed: ${parseFloat(
					e.target.value
				)}`
			)
			if (newVal != transaction[changedKey]) {
				e.target.classList.add(styles.pending_change)
			} else {
				e.target.classList.remove(styles.pending_change)
			}
		}

		const categoryDropdown = (
			<select
				data-key='category_id'
				defaultValue={transaction.category_id === null ? '' : transaction.category_id}
				onChange={handleInputChange}
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
				onChange={handleInputChange}
			>
				<option value='' />
				{data!.accounts.map((account) => {
					return <option value={account.account_id}>{account.name}</option>
				})}
			</select>
		)

		return [
			<input
				data-key='date'
				type='date'
				defaultValue={transaction.date}
				onChange={handleInputChange}
			/>,
			<div data-key='transaction_id'>{transaction.transaction_id}</div>,
			<input
				data-key='name'
				type='text'
				defaultValue={transaction.name}
				className={styles.name}
				onChange={handleInputChange}
			/>,
			categoryDropdown,
			accountDropdown,
			<InputDollar
				data-key='amount'
				type='number'
				defaultValue={transaction.amount}
				onChange={handleInputChange}
			/>,
		]
	})

	const jGridConfig: JGridProps = {
		headers: columnHeaderElems,
		content: transactionsElems,
		defaultColumnWidths: defaultColumnWidths,
	}

	return (
		<div>
			<JGrid className={styles.transaction_table} {...jGridConfig} />
		</div>
	)
}
