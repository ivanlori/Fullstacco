import { ChangeEvent, forwardRef, LegacyRef, ReactElement } from 'react'

import cn from 'classnames'

import styles from './Input.module.css'

interface Props {
	type?: 'text' | 'password' | 'email'
	disabled?: boolean
	name?: string
	value?: string | number
	placeholder?: string
	error?: string | undefined,
	dataTestId?: string
	onChange?: (arg0: ChangeEvent<HTMLInputElement>) => void,
	id?: string
}

const Input = forwardRef(({
	type = 'text',
	disabled,
	value,
	placeholder,
	onChange,
	name,
	error,
	dataTestId,
	id,
}: Props, ref: LegacyRef<HTMLInputElement> | undefined): ReactElement => {

	const inputStyle = cn(styles.Input, {
		[styles.WithError]: error
	})

	return (
		<div className="relative">
			<input
				id={id}
				ref={ref}
				type={type}
				name={name}
				disabled={disabled}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={inputStyle}
				data-testid={dataTestId}
			/>
			{error && <strong className={styles.Error}>{error}</strong>}
		</div>
	)
})

export default Input
