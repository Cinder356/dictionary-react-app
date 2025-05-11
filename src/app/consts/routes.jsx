import EditingPage from '/src/pages/EditingPage/components/EditingPage/EditingPage'
import ViewPage from '/src/pages/ViewPage/components/ViewPage/ViewPage'
import LearningEntryPage from '/src/pages/LearningEntryPage/components/LearningEntryPage/LearningEntryPage'

export default Object.freeze([
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
	}
])