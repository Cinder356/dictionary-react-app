import Modal from '/src/ui/Modal/Modal'
import btnColors from '/src/app/consts/btnColors'
import Button from '/src/ui/Button/Button'
import Input from '/src/ui/Input/Input'
import { useState } from 'react'
import './WordPairEditingModal.scss'

const pairWordsClasses = 'input-pair-element'
const pairWrongWordsClasses = pairWordsClasses + ' error'

export default function WordPairEditingModal({ modalOpenState, setModalOpenState, onSubmit, closeOnSubmit = false, leftDefault = '', rightDefault = '' }) {
	// if (!modalOpenState) return

	const [pairWrongness, setPairWrogness] = useState({
		left: false,
		right: false
	})

	const [pair, setPair] = useState({
		left: leftDefault,
		right: rightDefault
	})

	const handlePair = (event, side = '') => {
		setPair({ ...pair, [side]: event.target.value })
		setPairWrogness({ ...pairWrongness, [side]: event.target.value.length === 0 })
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
				<Input id="left-word-input" className={'input-pair-element'} isWrong={pairWrongness.left} type="text"
					onChange={(e) => handlePair(e, 'left')} value={pair.left} />
				<b>:</b>
				<Input id="right-word-input" className={'input-pair-element'} isWrong={pairWrongness.right} type="text"
					onChange={(e) => handlePair(e, 'right')} value={pair.right} />
			</div>
			<div className="navigation-buttons-container">
				<Button
					className="close-button"
					color={btnColors.RED}
					onClick={() => setModalOpenState(false)}>Close</Button>
				<Button
					className="add-button"
					disabled={pair.left.length === 0 || pair.right.length === 0}
					onClick={handleAddButton}>Submit</Button>
			</div>
		</Modal>
	)
}

