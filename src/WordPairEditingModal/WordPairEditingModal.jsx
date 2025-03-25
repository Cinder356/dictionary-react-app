import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import { useState } from 'react'
import './WordPairEditingModal.scss'

const pairWordsClasses = 'control input-pair-element'
const pairWrongWordsClasses = pairWordsClasses + ' error'

export default function WordPairEditingModal({ modalOpenState, setModalOpenState, onSubmit, closeOnSubmit = false, leftDefault = '', rightDefault = '' }) {
	if (!modalOpenState) return

	const [pair, setPair] = useState({
		left: leftDefault,
		right: rightDefault
	})

	const handlePair = (event) => {
		if (event.target.id === 'left-word-input')
			setPair({ left: event.target.value, right: pair.right })
		else if (event.target.id === 'right-word-input')
			setPair({ left: pair.left, right: event.target.value })


		if (event.target.value.length === 0) {
			event.target.className = pairWrongWordsClasses
			return
		}
		event.target.className = pairWordsClasses
	}

	const handleAddButton = () => {
		onSubmit(pair)
		setPair({ left: '', right: '' })
		if (closeOnSubmit) setModalOpenState(false)
	}

	return (
		<Modal isOpen={modalOpenState}>
			<label htmlFor="input-word-pair"><b>New translation</b></label>
			<div className="input-pair-container" id="input-word-pair" >
				<input id="left-word-input" className={pairWordsClasses} type="text"
					onChange={handlePair} value={pair.left} />
				<b>:</b>
				<input id="right-word-input" className={pairWordsClasses} type="text"
					onChange={handlePair} value={pair.right} />
			</div>
			<div className="navigation-buttons-container">
				<Button
					className="close-button"
					onClick={() => setModalOpenState(false)}>Close</Button>
				<Button
					className="add-button"
					disabled={pair.left.length === 0 || pair.right.length === 0}
					isActive={true}
					onClick={handleAddButton}>Submit</Button>
			</div>
		</Modal>
	)
}

