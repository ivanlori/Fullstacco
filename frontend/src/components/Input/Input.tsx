import { ChangeEvent, forwardRef, LegacyRef, ReactElement } from 'react'

import cn from 'classnames'
import { FieldError } from 'react-hook-form'

import styles from './Input.module.css'

interface Props {
	type?: 'text' | 'password' | 'email'
	required?: boolean
	disabled?: boolean
	name?: string
	editOnClick?: () => void
	value?: string | number
	placeholder?: string
	error: FieldError | undefined
	dataTestId?: string
	onChange?: (arg0: ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef(({
	type = 'text',
	disabled,
	value,
	placeholder,
	onChange,
	name,
	error,
	dataTestId
}: Props,
	ref: LegacyRef<HTMLInputElement> | undefined
): ReactElement => {

	const inputStyle = cn(styles.Input, {
		[styles.WithError]: error
	})

	return (
		<div className="relative">
			<input
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
			{error && <span className={styles.Error}>{error.message}</span>}
		</div>
	)
})

Input.displayName = 'Input'

export default Input
