import { ChangeEvent, ReactElement } from 'react'

import styles from './Select.module.css'

type IItem = {
	id: number
	value: string
}

interface Props {
	items: IItem[]
	id: string
	name: string
	dataTestId: string
	onChange: (target: IItem) => void
	value: IItem
}

export const Select = ({
	items,
	id,
	name,
	onChange,
	dataTestId,
	value,
}: Props): ReactElement => {

	const getItemId = (e: ChangeEvent<HTMLSelectElement>) => {
		return items.find((item) => item.value === e.target.value)?.id as number
	}

	return (
		<select
			className={styles.Container}
			id={id}
			name={name}
			onChange={(e: ChangeEvent<HTMLSelectElement>) => {
				onChange({ id: getItemId(e), value: e.target.value })
			}}
			data-test-id={dataTestId}
			value={value.value}
		>
			{items.map((item: IItem) => {
				return (
					<option
						key={item.id}
						id={String(item.id)}
					>
						{item.value}
					</option>
				)
			})}
		</select>
	)
}
