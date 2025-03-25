import { useState } from 'react'
import Header from './Header/Header'
import { tabs, TabContext } from './NavBar/tabs'
import EditingPage from './EditingPage/EditingPage'

function App() {
	const [tab, setTab] = useState(tabs.Editing)

	return (
		<>
			<TabContext.Provider value={[tab, setTab]}>
				<Header />
			</TabContext.Provider>
			<main>
				{tab === tabs.Editing && <EditingPage />}
				{tab === tabs.Browse && <div className='content-wrapper'><h1>Browsing</h1></div>}
			</main>

		</>
	)
}

export default App
