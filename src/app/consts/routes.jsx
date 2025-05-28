import EditingPage from '@/pages/EditingPage/components/EditingPage/EditingPage'
import ViewPage from '@/pages/ViewPage/components/ViewPage/ViewPage'
import LearningEntryPage from '@/pages/LearningEntryPage/components/LearningEntryPage/LearningEntryPage'
import CardsModePage from '@/pages/CardsModePage/components/CardsModePage/CardsModePage'
import TestModePage from '@/pages/TestModePage/components/TestModePage/TestModePage'

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
	},
	{
		path: '/learn/:id/test',
		element: <TestModePage />
	}
])