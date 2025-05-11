import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import routes from './consts/routes';
import Header from '/src/modules/Header/Header'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					{routes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App
