import { ReactElement, useEffect, useState, useRef } from 'react'

import { useIntl } from 'react-intl'
import { RootStateOrAny, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { login, profile } from 'routes'

import styles from './Header.module.css'

const Header = (): ReactElement => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { formatMessage } = useIntl()
	const navigate = useNavigate()
	const ref = useRef<HTMLDivElement>(null)
	const refItem = useRef<HTMLAnchorElement>(null)
	const username = useSelector((state: RootStateOrAny) => state.user.username)

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
	}, [isMenuOpen])

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
					className="flex items-center"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<span className="mr-3 cursor-pointer">
						{username}
					</span>
					<div className={styles.Badge}></div>
				</div>
				{isMenuOpen && (
					<div
						data-testid="user-dropdown"
						className={styles.Dropdown}
					>
						<ul className="p-5">
							<li className={styles.MenuItem}>
								<Link
									to={profile}
									className="w-full"
									ref={refItem}
								>
									{formatMessage({ id: 'view.profile' })}
								</Link>
							</li>
							<li className={styles.MenuItem}>
								<Link
									to={login}
									data-testid="logout_icon"
									className="flex items-center"
									onClick={() => localStorage.clear()}
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
