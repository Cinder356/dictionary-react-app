import Modal from '/src/ui/Modal/Modal'
import IconBtn from '@/ui/IconBtn/IconBtn'
import Input from '/src/ui/Input/Input'
import { useState, useCallback } from 'react'
import './WordPairEditingModal.scss'

import CrossIcon from '@/app/icons/cross.svg?react'
import CheckIcon from '@/app/icons/check.svg?react'

export default function WordPairEditingModal({ isOpen, onClose, onSubmit, closeOnSubmit = false, leftDefault = '', rightDefault = '' }) {
	const [pairWrongness, setPairWrogness] = useState({
		left: false,
		right: false
	})
	const [pair, setPair] = useState({
		left: leftDefault,
		right: rightDefault
	})

	const handlePair = useCallback((event, side = '') => {
		setPair({ ...pair, [side]: event.target.value })
		setPairWrogness({ ...pairWrongness, [side]: event.target.value.length === 0 })
	}, [pair, pairWrongness])

	const handleSubmit = useCallback(() => {
		onSubmit(pair)
		setPair({ left: '', right: '' })
		if (closeOnSubmit) onClose()
	}, [pair, closeOnSubmit])

	return (
		<Modal className='new-pair-modal' isOpen={isOpen}>
			<label htmlFor="input-word-pair"><b>Translation</b></label>
			<div className="input-pair-container" id="input-word-pair" >
				<Input id="left-word-input" className='input-pair-element' isWrong={pairWrongness.left} type="text"
					onChange={(e) => handlePair(e, 'left')} value={pair.left} />
				<b>:</b>
				<Input id="right-word-input" className='input-pair-element' isWrong={pairWrongness.right} type="text"
					onChange={(e) => handlePair(e, 'right')} value={pair.right} />
			</div>
			<div className="navigation-buttons-container">
				<IconBtn onClick={() => onClose(false)}> <CrossIcon className='red-icon' /></IconBtn>
				<IconBtn onClick={handleSubmit} disabled={pair.left.length === 0 || pair.right.length === 0}><CheckIcon className='green-icon' /></IconBtn>
			</div>
		</Modal>
	)
}

