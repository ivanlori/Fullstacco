import { FC, ReactElement, ReactNode, SyntheticEvent } from 'react'

import cn from 'classnames'

import { Loader } from 'components'

import styles from './Button.module.css'

const PRIMARY = 'primary'
const PRIMARY_OUTLINE = 'primary_outline'
const DANGER = 'danger'
const DANGER_OUTLINE = 'danger_outline'

interface Props {
	style?:
	| typeof PRIMARY
	| typeof PRIMARY_OUTLINE
	| typeof DANGER
	| typeof DANGER_OUTLINE
	onClick?: (e: SyntheticEvent) => void
	children: ReactNode
	title?: string
	dataTestId?: string
	loading?: boolean
	type?: | 'submit' | 'button'
}

const Button: FC<Props> = ({
	children,
	style = PRIMARY,
	type = 'button',
	title,
	dataTestId,
	loading,
	onClick,
}: Props): ReactElement => {

	const BtnStyle = cn(styles.Btn, {
		[styles.BtnPrimary]: style === PRIMARY,
		[styles.BtnOutline]: style === PRIMARY_OUTLINE,
		[styles.BtnDangerOutline]: style === DANGER_OUTLINE,
		[styles.BtnDanger]: style === DANGER,
	})

	return (
		<button
			data-testid={dataTestId}
			type={type}
			title={title}
			onClick={onClick}
			className={BtnStyle}
		>
			{
				loading ? <Loader small /> : children
			}
		</button>
	)
}

export default Button
