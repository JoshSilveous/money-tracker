import { useRef } from 'react'
import styles from './InputDollar.module.scss'
export function InputDollar({ onChange, ...props }: React.ComponentProps<'input'>) {
	const leftRef = useRef<HTMLInputElement>(null)
	const rightRef = useRef<HTMLInputElement>(null)

	function customOnChange() {
		if (onChange !== undefined) {
			const leftVal = leftRef.current!.value
			const rightVal = rightRef.current!.value

			console.log(leftVal, rightVal)
		}
	}
	return (
		<div {...props} className={styles.container}>
			<input
				step={0}
				type='number'
				onChange={customOnChange}
				className={styles.left_of_decimal}
				ref={leftRef}
			/>
			<div className={styles.decimal}>.</div>
			<input
				step={0}
				type='number'
				onChange={customOnChange}
				className={styles.right_of_decimal}
				ref={rightRef}
			/>
		</div>
	)
}
