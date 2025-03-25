import './Translation.scss'
import Button from '../Button/Button'
import WordPairEditingModal from '../WordPairEditingModal/WordPairEditingModal'
import { useState } from 'react'
import { ModuleDictActions } from '../EditingPage/moduleDictActions'

export default function Translation({ moduleDictDispatch, id, left = '', right = '' }) {
	const [modalOpenState, setModalOpenState] = useState(false) // в идеале избавиться от useState, создав функцию, которая вызывает модалку 

	return (
		<div className='translation-block content-wrapper'>
			<div className="pair">
				<h4 className='pair-word'>{left}</h4>
				<h3>:</h3>
				<h4 className='pair-word'>{right}</h4>
			</div>
			<div className="control-panel">
				<Button
					style={{ backgroundColor: 'var(--red-accent-color)' }}
					isActive={true}
					onClick={() => moduleDictDispatch({ type: ModuleDictActions.REMOVE, id })}
				>Delete</Button>
				<Button isActive={true} onClick={() => setModalOpenState(true)}>Edit</Button>
			</div>
			<WordPairEditingModal
				{...{ modalOpenState, setModalOpenState }}
				onSubmit={pair => moduleDictDispatch({ type: ModuleDictActions.EDIT, id, ...pair })}
				closeOnSubmit={true}
				leftDefault={left}
				rightDefault={right}
			/>
		</div>
	)
}