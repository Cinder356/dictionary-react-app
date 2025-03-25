import Button from "../Button/Button"
import { useContext, useState } from "react"
import { tabs, TabContext } from './tabs'
import './NavBar.scss'

export default function NavBar() {
	const [tab, setTab] = useContext(TabContext)
	const [burgerOpenState, setBurgerOpenState] = useState(false)

	const handleTabChanging = (newTab) => {
		setTab(newTab)
		setBurgerOpenState(false);
	}

	return (
		<>
			<nav className='line-nav'>
				<Button onClick={() => setTab(tabs.Editing)} isActive={tab === tabs.Editing}>Edit modules</Button>
				<Button onClick={() => setTab(tabs.Browse)} isActive={tab === tabs.Browse}>Browse</Button>

			</nav>
			<span className={`burger ${burgerOpenState ? 'active' : ''}`} onClick={() => setBurgerOpenState(!burgerOpenState)} >
			</span>

			{burgerOpenState &&
				<div className={`burger-menu ${burgerOpenState ? 'active' : ''}`}>
					<ul>
						<li><Button onClick={() => handleTabChanging(tabs.Editing)} isTransparent={true} isActive={tab === tabs.Editing}>Edit</Button></li>
						<li><Button onClick={() => handleTabChanging(tabs.Browse)} isTransparent={true} isActive={tab === tabs.Browse}>Browse</Button></li>
					</ul>

				</div>
			}
		</>
	)
}