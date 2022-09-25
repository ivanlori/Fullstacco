import { ReactElement, useEffect, useState, useRef } from 'react'

import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import { login, profile } from 'routes'
import { IState } from 'types/state'

import styles from './Header.module.css'

const Header = (): ReactElement => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { formatMessage } = useIntl()
	const navigate = useNavigate()
	const ref = useRef<HTMLDivElement>(null)
	const refItem = useRef<HTMLAnchorElement>(null)
	const {
		username,
		photoUrl
	} = useSelector((state: IState) => state.profile)

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			if (
				isMenuOpen &&
				ref.current &&
				!ref.current.contains(e.target as HTMLElement)
			) {
				setIsMenuOpen(false)
			}

			if (
				isMenuOpen &&
				refItem.current &&
				refItem.current.contains(e.target as HTMLElement)
			) {
				navigate(profile)
				setIsMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [isMenuOpen, navigate])

	return (
		<nav className={styles.Nav} ref={ref}>
			<div className={styles.Container}>
				<div className="flex items-center">
					<Link to="/" className="text-blue_dark">
						Fullstacco
					</Link>
				</div>
				<div
					id="menu"
					className="flex items-center cursor-pointer"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					data-testid={DataTestKeys.dropdownMenu}
				>
					<span
						className="mr-3"
						data-testid={DataTestKeys.headerUsername}
					>
						{username}
					</span>
					{photoUrl ?
						<div className={styles.Photo}></div>
						:
						<div className={styles.PhotoPlaceholder}></div>
					}
				</div>
				{isMenuOpen && (
					<div
						data-testid={DataTestKeys.userDropdown}
						className={styles.Dropdown}
					>
						<ul className="p-3">
							<li className={styles.MenuItem}>
								<Link
									to={profile}
									className="w-full"
									ref={refItem}
									data-testid={DataTestKeys.profileDropdown}
								>
									{formatMessage({ id: 'view.profile' })}
								</Link>
							</li>
							<li className={styles.MenuItem}>
								<Link
									to={login}
									className="flex items-center"
									onClick={() => localStorage.clear()}
									data-testid={DataTestKeys.logoutDropdown}
								>
									{formatMessage({ id: 'logout' })}
								</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Header
