import { ReactElement } from 'react'

import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { ArrowLeft } from 'components/Icon/svg/icons'

import styles from './Back.module.css'

export const Back = (): ReactElement => {
	const navigate = useNavigate()
	const onBack = () => navigate(-1)

	return (
		<div
			className={styles.Container}
			onClick={onBack}
			onKeyDown={onBack}
			role="button"
			tabIndex={-1}
		>
			<ArrowLeft />
			<span className={styles.Word}>
				<FormattedMessage id="go.back" />
			</span>
		</div>
	)
}
