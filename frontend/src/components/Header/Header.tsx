import { ReactElement, useEffect, useState, useRef } from 'react'

import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from 'components/Button/Button'
import { User } from 'components/Icon/svg/icons'
import { DataTestKeys } from 'data-test-keys'
import { resetProfile } from 'pages/profile/store/Profile.actions'
import { dashboardHome, dashboardProfile, login } from 'routes'
import { IState } from 'types/state'
import { TOKEN_STORAGE, USER_ID_STORAGE } from 'utils/utils'

import styles from './Header.module.css'

export const Header = (): ReactElement => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const dispatch = useDispatch()
	const { formatMessage } = useIntl()
	const navigate = useNavigate()
	const ref = useRef<HTMLDivElement>(null)
	const refItem = useRef<HTMLAnchorElement>(null)
	const {
		username,
		photoUrl,
	} = useSelector((state: IState) => state.profileReducer)

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
				navigate(dashboardProfile)
				setIsMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [isMenuOpen, navigate])

	const handleLogout = () => {
		localStorage.removeItem(TOKEN_STORAGE)
		localStorage.removeItem(USER_ID_STORAGE)
		dispatch(resetProfile())
		navigate(login)
	}

	return (
		<nav className={styles.Nav} ref={ref}>
			<div className={styles.Container}>
				<div className="flex items-center p-5">
					<Link
						to={dashboardHome}
						className="text-blue_dark text-xl"
					>
						Fullstacco
					</Link>
				</div>
				<div
					id="menu"
					className={styles.DropdownMenu}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					onKeyDown={() => setIsMenuOpen(!isMenuOpen)}
					data-testid={DataTestKeys.dropdownMenu}
					role="button"
					tabIndex={0}
				>
					<span
						className="mr-3"
						data-testid={DataTestKeys.headerUsername}
					>
						{username}
					</span>
					{photoUrl ?
						(
							<img
								src={photoUrl}
								className={styles.Photo}
								alt="profile"
							/>
						)
						:
						<User width={40} height={40} />
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
									to={dashboardProfile}
									className="w-full"
									ref={refItem}
									data-testid={DataTestKeys.profileDropdown}
								>
									{formatMessage({ id: 'view.profile' })}
								</Link>
							</li>
							<li className="mt-2 pt-2 border-gray_300 border-t">
								<Button
									type="button"
									onClick={handleLogout}
									dataTestId={DataTestKeys.logoutDropdown}
								>
									{formatMessage({ id: 'logout' })}
								</Button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	)
}
