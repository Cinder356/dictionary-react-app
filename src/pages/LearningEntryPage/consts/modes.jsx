import paths from '../../../app/consts/paths'
import cardsIcon from '/cards.svg'

export default [
	{
		component: <><img src={cardsIcon} className='text-icon' alt="" /> Cards</>,
		value: '0',
		getPath: paths.getCards
	},
	{
		component: 'Test',
		value: '1',
		getPath: () => console.log('1 empty')
	},
	{
		component: 'someething',
		value: '2',
		getPath: () => console.log('2 empty')
	}
]