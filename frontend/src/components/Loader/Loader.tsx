import { ReactElement } from 'react'

import styles from './Loader.module.css'

interface Props {
	small?: boolean
}

const Loader = ({ small }: Props): ReactElement => (
	<div className={`${styles.Container} ${small && styles.Small}`}>
		<div className={`${styles.Loader} ${small && styles.Small}`}></div>
	</div>
)

export default Loader
