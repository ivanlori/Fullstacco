import { ReactElement } from 'react'

import styles from './Loader.module.css'

interface Props {
	small?: boolean
}

export const Loader = ({ small = false }: Props): ReactElement => (
	<div className={`${styles.Container} ${small ? styles.Small : ''}`}>
		<div className={`${styles.Loader} ${small ? styles.Small : ''}`}></div>
	</div>
)
