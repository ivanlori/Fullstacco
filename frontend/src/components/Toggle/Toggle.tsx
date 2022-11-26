import { ReactElement } from 'react'

import classNames from 'classnames'

import styles from './Toggle.module.css'

interface Props {
	id: string
	active: boolean
	onChange: () => void
}

export const Toggle = ({
	id,
	active,
	onChange
}: Props): ReactElement => {
	const statusBackgroundStyle = () => {
		return classNames(styles.BackgroundStatus, {
			['bg-green_light']: active,
			['bg-ochre_dark']: !active
		})
	}

	const statusDotStyle = () => {
		return classNames(styles.DotStatus, {
			['right-1']: active,
			['left-1']: !active
		})
	}

	return (
		<label
			htmlFor={id}
			className={styles.StatusLabel}
		>
			<div className="relative">
				<input
					type="checkbox"
					id={id}
					className="sr-only"
				/>
				<div
					role="button"
					tabIndex={-1}
					className={statusBackgroundStyle()}
					onKeyDown={onChange}
					onClick={onChange}
				></div>
				<div
					role="button"
					tabIndex={-1}
					className={statusDotStyle()}
					onKeyDown={onChange}
					onClick={onChange}
				></div>
			</div>
		</label>
	)
}
