import EditingPage from '/src/pages/EditingPage/components/EditingPage/EditingPage'
import ViewPage from '/src/pages/ViewPage/components/ViewPage/ViewPage'
import LearningEntryPage from '/src/pages/LearningEntryPage/components/LearningEntryPage/LearningEntryPage'
import CardsModePage from '/src/pages/CardsModePage/components/CardsModePage/CardsModePage'

export default Object.freeze([
	{
		path: '/',
		element: <div className='content-wrapper'><h2>Hello</h2></div>
	},
	{
		path: '/view',
		element: <ViewPage />
	},
	{
		path: '/editing/:id',
		element: <EditingPage />
	},
	{
		path: '/learn/:id',
		element: <LearningEntryPage />
	},
	{
		path: '/learn/:id/cards',
		element: <CardsModePage />
	}
])