import { ReactElement, useEffect, useState } from 'react'

import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import { Icon } from 'components'
import { DataTestKeys } from 'data-test-keys'

import { toastHiddenAction } from './store/Toast.action'
import styles from './Toast.module.css'

const SUCCESS = 'success'
const ERROR = 'error'

interface Props {
	type: typeof SUCCESS | typeof ERROR | null
	text: string
}

const Toast = ({ type, text }: Props): ReactElement => {
	const [
		effect,
		setEffect
	] = useState(`${styles.SlideInRight}`)
	const dispatch = useDispatch<Dispatch>()

	const container = cn(`${styles.Wrapper} ${styles.Animated} ${effect}`,
		{
			'bg-ochre_dark': type === ERROR,
			'bg-green_primary': type === SUCCESS
		})

	useEffect(() => {
		setTimeout(() => {
			setEffect(`${styles.SlideOutRight}`)
		}, 2000)

		setTimeout(() => {
			dispatch(toastHiddenAction())
		}, 4000)
	}, [])

	return (
		<div
			className={container}
			data-testid={
				type === SUCCESS ? DataTestKeys.feedbackSuccess : DataTestKeys.feedbackError
			}>
			<div className="p-2 text-center text-white">
				<Icon icon={type === SUCCESS ? faCheck : faExclamation} />
			</div>
			<div className="flex items-center">
				<p className="text-sm font-bold">{text}</p>
			</div>
		</div>
	)
}

export default Toast
