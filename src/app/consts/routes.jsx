import EditingPage from '/src/pages/EditingPage/components/EditingPage/EditingPage'
import ViewPage from '/src/pages/ViewPage/components/ViewPage/ViewPage'

export default Object.freeze([
	{
		path: '/view',
		element: <ViewPage />
	},
	{
		path: '/editing/:id',
		element: <EditingPage />
	}
])