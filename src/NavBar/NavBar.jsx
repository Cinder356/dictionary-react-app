import Button from "../Button/Button"
import { useContext } from "react"
import { tabs, TabContext } from './tabs'
import classes from './NavBar.module.scss'

export default function NavBar() {
	const [tab, setTab] = useContext(TabContext)

	return (
		<nav className={classes.nav}>
			<Button onClick={() => setTab(tabs.Editing)} isActive={tab === tabs.Editing}>Edit modules</Button>
			<Button onClick={() => setTab(tabs.Browse)} isActive={tab === tabs.Browse}>Browse</Button>
		</nav>
	)
}