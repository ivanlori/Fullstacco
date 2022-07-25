import { ReactElement } from 'react'

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import styles from './Sidebar.module.css'

const SidebarNav = (): ReactElement => (
	<aside className={styles.Aside}>
		<ul className="text-center lg:block">
			<li className="mb-4">
				<Link to="/" data-testid="link-home">
					<FormattedMessage id="sidebar.home" />
				</Link>
			</li>
			<li className="mb-4">
				<Link to="/users" data-testid="link-users">
					<FormattedMessage id="sidebar.users" />
				</Link>
			</li>
		</ul>
	</aside>
)

export default SidebarNav
