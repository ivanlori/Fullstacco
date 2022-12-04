import { ReactElement } from 'react'

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import { dashboardHome, dashboardUserList } from 'routes'

import styles from './Sidebar.module.css'

export const Sidebar = (): ReactElement => (
	<aside className={styles.Aside}>
		<ul className="text-center lg:block">
			<li className="mb-4">
				<Link to={dashboardHome} data-testid={DataTestKeys.linkHome}>
					<FormattedMessage id="sidebar.home" />
				</Link>
			</li>
			<li className="mb-4">
				<Link to={dashboardUserList} data-testid={DataTestKeys.linkUsers}>
					<FormattedMessage id="sidebar.users" />
				</Link>
			</li>
		</ul>
	</aside>
)
