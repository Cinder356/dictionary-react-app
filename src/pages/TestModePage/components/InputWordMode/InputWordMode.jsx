import { useEffect, useRef, useState } from 'react'
import TermCaption from '../TermCaption/TermCaption'
import Input from '@/ui/Input/Input'
import Button from '@/ui/Button/Button'
import './InputWordMode.scss'

export default function ({ dict, currentDictIndex, onAnswer, modeEnterHandlerRef }) {
	const [isAnswered, setIsAnswered] = useState(false)
	const [isCorrect, setIsCorrect] = useState(false)
	const [inputText, setInputText] = useState('')
	const inputRef = useRef()

	useEffect(() => {
		setIsAnswered(false)
		setIsCorrect(false)
		setInputText('')
	}, [dict, currentDictIndex])

	const handleChecking = () => {
		if (isAnswered) return
		const term = dict[currentDictIndex].left.replace(/\s/g, '').toLowerCase()
		const def = inputText.replace(/\s/g, '').toLowerCase()
		const correctness = term.includes(def) && def

		setIsCorrect(correctness)
		setIsAnswered(true)
		onAnswer(correctness)
	}

	const enterHandler = () => {
		handleChecking()
		inputRef.current?.blur()
	}

	return (
		<>
			<TermCaption>{dict[currentDictIndex].right}</TermCaption>
			{isAnswered && <h3 id='input-word-correct-answer'>{dict[currentDictIndex].left}</h3>}
			<div id='test-definition-input-container'>
				<Input
					ref={inputRef}
					id='test-definition-input'
					isWrong={isAnswered && !isCorrect}
					isCorrect={isAnswered && isCorrect}
					value={inputText}
					onChange={val => setInputText(val.target.value)}
					onFocus={() => modeEnterHandlerRef.current = enterHandler}
					onBlur={() => modeEnterHandlerRef.current = null}
				/>
				<Button id='test-definition-submit-btn' onClick={handleChecking}>Check</Button>
			</div>
		</>
	)
}