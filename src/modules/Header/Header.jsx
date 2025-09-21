import NavBar from '@/components/NavBar/NavBar'
import './Header.scss'
import logo from '/icons/logo.svg'

export default function Header() {
	return (
		<header>
			<div className="header-content-container">
				<div id='logo-container'>
					<img src={logo} alt="logo-error" />
					<h1>LTerm</h1>
				</div>

				<NavBar />
			</div>
		</header>
	)
}