import NavBar from '../NavBar/NavBar'
import './Header.scss'
import logo from '/vite.svg'

export default function Header() {
	return (
		<header>
			<div id='logo-container'>
				<img src={logo} alt="logo-error" />
				<h1>Vite</h1>
			</div>

			<NavBar />
		</header>
	)
}