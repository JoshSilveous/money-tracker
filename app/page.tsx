import { TransactionsTable } from './components/TransactionsTable/TransactionsTable'
import styles from './page.module.scss'

export default function Home() {
	return (
		<main className={styles.main}>
			<TransactionsTable />
		</main>
	)
}
