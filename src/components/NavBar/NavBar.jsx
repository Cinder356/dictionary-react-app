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
				<Button onClick={() => navigate(paths.getLearn(-1))} color={getNavBtnColor(paths.getLearn(-1))}>Learn</Button>
				<Button onClick={() => navigate(paths.getView())} color={getNavBtnColor(paths.getView())}>View</Button>
			</nav>

			<div className="burger-tap-zone" onClick={() => setBurgerOpenState(!burgerOpenState)}>
				<span className={`burger ${burgerOpenState ? 'active' : ''}`} />
			</div>

			{burgerOpenState &&
				<div className={`burger-menu ${burgerOpenState ? 'active' : ''}`}>
					<ul>
						<li><Button onClick={() => handleBurgerNavigate(paths.getLearn(-1))} color={getNavBtnColor(paths.getLearn(-1))} isTransparent={true}>Learn</Button></li>
						<li><Button onClick={() => handleBurgerNavigate(paths.getView())} color={getNavBtnColor(paths.getView())} isTransparent={true}>View</Button></li>
					</ul >

				</div >
			}
		</>
	)
}