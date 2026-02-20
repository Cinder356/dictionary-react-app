import { Link } from 'react-router-dom'
import paths from '@/app/consts/paths'
import NavBar from '@/components/NavBar/NavBar'
import './Header.scss'
import logo from '/icons/logo.png'

export default function Header() {
  return (
    <header>
      <div className="header-content-container">
        <div id='logo-container'>
          <img src={logo} alt="logo-error" />
          <h1 className='brand-name' translate='no'><Link to={paths.getHome()}>LTerm</Link></h1>
        </div>

        <NavBar />
      </div>
    </header>
  )
}
