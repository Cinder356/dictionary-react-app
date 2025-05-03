import './Translation.scss'
import btnColors from '../../app/consts/btnColors'
import Button from '../../ui/Button/Button'
import WordPairEditingModal from '../WordPairEditingModal/WordPairEditingModal'
import { useState } from 'react'

export default function Translation({ id, left = '', right = '', onRemove, onEdit, }) {
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
					color={btnColors.RED}
					onClick={() => onRemove(id)}
				>Delete</Button>
				<Button onClick={() => setModalOpenState(true)}>Edit</Button>
			</div>
			<WordPairEditingModal
				{...{ modalOpenState, setModalOpenState }}
				onSubmit={pair => onEdit(id, pair)}
				closeOnSubmit={true}
				leftDefault={left}
				rightDefault={right}
			/>
		</div>
	)
}