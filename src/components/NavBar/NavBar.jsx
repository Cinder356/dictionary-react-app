import { useNavigate, useLocation } from "react-router-dom"
import btnColors from "/src/app/consts/btnColors"
import Button from "/src/ui/Button/Button"
import { useState } from "react"
import paths from "/src/app/consts/paths"
import './NavBar.scss'

export default function NavBar() {
	const navigate = useNavigate()
	const location = useLocation()
	const [burgerOpenState, setBurgerOpenState] = useState(false)

	const getNavBtnColor = (ownPath) => {
		if (location.pathname === ownPath) return btnColors.ACTIVE
		return btnColors.INACTIVE
	}

	const handleBurgerNavigate = (path) => {
		setBurgerOpenState(false)
		navigate(path)
	}

	return (
		<>
			<nav className='line-nav'>
				<Button onClick={() => navigate(paths.view)} color={getNavBtnColor(paths.view)}>View</Button>

			</nav>

			<div className="burger-tap-zone" onClick={() => setBurgerOpenState(!burgerOpenState)}>
				<span className={`burger ${burgerOpenState ? 'active' : ''}`} />
			</div>

			{burgerOpenState &&
				<div className={`burger-menu ${burgerOpenState ? 'active' : ''}`}>
					<ul>
						<li><Button onClick={() => handleBurgerNavigate(paths.view)} color={getNavBtnColor(paths.view)} isTransparent={true}>View</Button></li>
					</ul >

				</div >
			}
		</>
	)
}