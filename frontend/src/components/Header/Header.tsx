import { ReactElement, useEffect, useState, useRef } from 'react'

import { RootStateOrAny, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

const Header = (): ReactElement => {
	const [open, setOpen] = useState(false)
	const menu = useRef<HTMLDivElement>(null)
	const username = useSelector((state: RootStateOrAny) => state.user.username)

	const logout = () => {
		localStorage.clear()
		window.location.href = '/login'
	}

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!menu.current?.contains(e.target as HTMLElement)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside, true)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside, true)
		}
	}, [menu])

	return (
		<nav className={styles.Nav}>
			<div className={styles.Container}>
				<div className="flex items-center">
					<Link to="/" className="text-blue_dark">
						Fullstacco
					</Link>
				</div>
				<div
					ref={menu}
					id="menu"
					className="flex items-center"
					onClick={() => setOpen(!open)}
				>
					<span className="mr-3 cursor-pointer">
						{username}
					</span>
					<div className={styles.Badge}></div>
				</div>
				{open && (
					<div
						data-testid="user-dropdown"
						className={styles.Dropdown}
						ref={menu}
					>
						<ul className="p-5">
							<li className={styles.MenuItem}>
								<Link
									to="/profile"
									className="w-full"
								>
									View Profile
								</Link>
							</li>
							<li
								className={styles.MenuItem}
								onClick={logout}
							>
								<div
									data-testid="logout_icon"
									role="button"
									title="Logout"
									className="flex items-center"
								>
									<span>Logout</span>
								</div>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Header
