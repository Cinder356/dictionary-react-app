import paths from '@/app/consts/paths'
import CardIcon from '@/app/icons/card.svg?react'
import TestIcon from '@/app/icons/test.svg?react'

export default [
	{
		component: <span className='modes-radio-element'><CardIcon className='radio-icon pink-icon' /> Cards</span>,
		value: '0',
		getPath: paths.getCards,
	},
	{
		component: <span className='modes-radio-element'><TestIcon className='radio-icon pink-icon' /> Test</span>,
		value: '1',
		getPath: paths.getTest
	}
]