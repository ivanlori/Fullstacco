import { ReactElement } from 'react'

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'

import styles from './Sidebar.module.css'

const SidebarNav = (): ReactElement => (
	<aside className={styles.Aside}>
		<ul className="text-center lg:block">
			<li className="mb-4">
				<Link to="/" data-testid={DataTestKeys.linkHome}>
					<FormattedMessage id="sidebar.home" />
				</Link>
			</li>
			<li className="mb-4">
				<Link to="/users" data-testid={DataTestKeys.linkUsers}>
					<FormattedMessage id="sidebar.users" />
				</Link>
			</li>
		</ul>
	</aside>
)

export default SidebarNav
