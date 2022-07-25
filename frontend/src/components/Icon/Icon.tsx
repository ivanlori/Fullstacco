import { CSSProperties, ReactElement } from 'react'

import { IconLookup, IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
	icon: IconLookup
	style?: CSSProperties
}

const Icon = ({ icon, style }: Props): ReactElement => (
	<FontAwesomeIcon icon={icon as IconProp} style={style} />
)

export default Icon