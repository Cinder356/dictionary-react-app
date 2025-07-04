import { useEffect, useRef, useState } from 'react'
import TermCaption from '../TermCaption/TermCaption'
import Input from '@/ui/Input/Input'
import Button from '@/ui/Button/Button'
import './InputWordMode.scss'

export default function ({ dict, currentDictIndex, onAnswer }) {
	const [isAnswered, setIsAnswered] = useState(false)
	const [isCorrect, setIsCorrect] = useState(false)
	const [inputText, setInputText] = useState('')

	useEffect(() => {
		setIsAnswered(false)
		setIsCorrect(false)
		setInputText('')
	}, [dict, currentDictIndex])

	const handleChecking = () => {
		if (isAnswered) return
		const term = dict[currentDictIndex].left.toLowerCase()
		const def = inputText.toLowerCase()
		const correctness = term.includes(def)

		setIsCorrect(correctness)
		setIsAnswered(true)
		onAnswer(correctness)
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleChecking()
			e.target.blur()
		}
	}

	return (
		<>
			<TermCaption>{dict[currentDictIndex].right}</TermCaption>
			{isAnswered && <h3 id='input-word-correct-answer'>{dict[currentDictIndex].left}</h3>}
			<div id='test-definition-input-container'>
				<Input
					id='test-definition-input'
					isWrong={isAnswered && !isCorrect}
					isCorrect={isAnswered && isCorrect}
					value={inputText}
					onChange={val => setInputText(val.target.value)}
					onKeyDown={handleKeyDown} />
				<Button id='test-definition-submit-btn' onClick={handleChecking}>Check</Button>
			</div>
		</>
	)
}