export function InputDollar({ onChange, ...props }: React.ComponentProps<'input'>) {
	function customOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		// e.target.value can be manually changed
		// so, we can make this into two separate input fields, and have the onChange fire with the composite value
		// but that'd be two input fields, which does the props get passed to?

		// maybe just one input field with the "." and rounding forced in. that'd probably limit styling though.
		if (onChange !== undefined) {
			e.target.value = '9999'
			onChange(e)
		}
	}
	return <input {...props} type='number' onChange={customOnChange} />
}
