import NavBar from '/src/components/NavBar/NavBar'
import './Header.scss'
import logo from '/vite.svg'

export default function Header() {
	return (
		<header>
			<div className="header-content-container">
				<div id='logo-container'>
					<img src={logo} alt="logo-error" />
					<h1>Vite</h1>
				</div>

				<NavBar />
			</div>
		</header>
	)
}