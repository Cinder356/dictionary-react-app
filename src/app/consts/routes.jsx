// import EditingPage from '@/pages/EditingPage/components/EditingPage/EditingPage'
// import ViewPage from '@/pages/ViewPage/components/ViewPage/ViewPage'
// import LearningEntryPage from '@/pages/LearningEntryPage/components/LearningEntryPage/LearningEntryPage'
// import CardsModePage from '@/pages/CardsModePage/components/CardsModePage/CardsModePage'
// import TestModePage from '@/pages/TestModePage/components/TestModePage/TestModePage'
import { lazy, Suspense } from "react"
import PageTitle from "@/ui/PageTitle/PageTitle"
const EditingPage = lazy(() => import('@/pages/EditingPage/components/EditingPage/EditingPage'))
const ViewPage = lazy(() => import('@/pages/ViewPage/components/ViewPage/ViewPage'))
const LearningEntryPage = lazy(() => import('@/pages/LearningEntryPage/components/LearningEntryPage/LearningEntryPage'))
const CardsModePage = lazy(() => import('@/pages/CardsModePage/components/CardsModePage/CardsModePage'))
const TestModePage = lazy(() => import('@/pages/TestModePage/components/TestModePage/TestModePage'))


export default [
	{
		path: '/',
		element: <div className='content-wrapper'><h2>Hello</h2></div>
	},
	{
		path: '/view',
		element: (<Suspense fallback={<PageTitle>Loading</PageTitle>}><ViewPage /></Suspense>)
	},
	{
		path: '/editing/:id',
		element: (<Suspense fallback={<PageTitle>Loading</PageTitle>}><EditingPage /></Suspense>)
	},
	{
		path: '/learn/:id',
		element: (<Suspense fallback={<PageTitle>Loading</PageTitle>}><LearningEntryPage /></Suspense>)
	},
	{
		path: '/learn/:id/cards',
		element: (<Suspense fallback={<PageTitle>Loading</PageTitle>}><CardsModePage /></Suspense>)
	},
	{
		path: '/learn/:id/test',
		element: (<Suspense fallback={<PageTitle>Loading</PageTitle>}><TestModePage /></Suspense>)
	}
]