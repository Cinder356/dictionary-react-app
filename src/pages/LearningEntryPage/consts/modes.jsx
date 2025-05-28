import paths from '@/app/consts/paths'
import cardsIconPath from '/icons/cards.svg'
import testIconPath from '/icons/test.svg'

export default [
	{
		component: <span><img className='text-icon' src={cardsIconPath} alt="" /> Cards</span>,
		value: '0',
		getPath: paths.getCards,
	},
	{
		component: <span><img className='text-icon' src={testIconPath} alt="" /> Test</span>,
		value: '1',
		getPath: paths.getTest
	}
]