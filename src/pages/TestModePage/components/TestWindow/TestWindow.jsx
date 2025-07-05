import { useEffect, useRef, useState } from 'react'
import Button from '@/ui/Button/Button'
import DefPickMode from '../DefPickMode/DefPickMode'
import InputWordMode from '../InputWordMode/InputWordMode'
import './TestWindow.scss'

const TEST_MODES_NAMES = {
	defPickMode: 0,
	inputWordMode: 1
}

const TEST_MODES_KEYS = Object.keys(TEST_MODES_NAMES)

export default function ({ dict, currentDictIndex, proceed }) {
	const [isAnswered, setIsAnswered] = useState(false)
	const isCorrectRef = useRef(false)
	const [currentTestMode, setCurrentTestMode] = useState()

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * TEST_MODES_KEYS.length)
		setCurrentTestMode(randomIndex)
	}, [currentDictIndex])

	// const handleEnter = useCallback(() => handleProceed(), [])// there is useCallback which is necessry because of useKeyHandler
	// const isEnterHandlerOnRef = useKeyHandler('', handleEnter)

	const handleAnswer = (isCorrect) => {
		setIsAnswered(true)
		isCorrectRef.current = isCorrect
	}

	const handleProceed = () => {
		setIsAnswered(false)
		proceed(isCorrectRef.current)
		isCorrectRef.current = false
	}

	return (
		<div className="content-wrapper">
			{TEST_MODES_NAMES.defPickMode === currentTestMode &&
				<DefPickMode dict={dict} currentDictIndex={currentDictIndex} onAnswer={handleAnswer} />}
			{TEST_MODES_NAMES.inputWordMode === currentTestMode &&
				<InputWordMode dict={dict} currentDictIndex={currentDictIndex} onAnswer={handleAnswer} />}
			<div id='proceed-btn-container'>
				<Button onClick={handleProceed} disabled={!isAnswered} >Proceed</Button>
			</div>
		</div>
	)
}

// dict={dict} currentDictIndex={currentDictIndex} onAnswer={handleAnswer}