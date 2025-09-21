import { useEffect, useRef, useState, useCallback } from 'react'
import useKeyHandler from '@/app/hooks/useKeyHandler'
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
	const [currentTestMode, setCurrentTestMode] = useState()
	const modeEnterHandlerRef = useRef(null)
	const isCorrectRef = useRef(false)

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * TEST_MODES_KEYS.length)
		setCurrentTestMode(randomIndex)
	}, [currentDictIndex])

	const handleEnter = useCallback(() => { // the useCallback is necessry because of useKeyHandler!!
		if (modeEnterHandlerRef.current) {
			modeEnterHandlerRef.current()
			return
		}
		if (isAnswered)
			handleProceed()
	}, [isAnswered])
	useKeyHandler('Enter', handleEnter)

	const handleAnswer = (isCorrect) => {
		setIsAnswered(true)
		isCorrectRef.current = isCorrect
	}

	const handleProceed = () => {
		setIsAnswered(false)
		proceed(isCorrectRef.current)
		modeEnterHandlerRef.current = null
		isCorrectRef.current = false
	}

	return (
		<div className="content-wrapper">
			{TEST_MODES_NAMES.defPickMode === currentTestMode &&
				<DefPickMode dict={dict} currentDictIndex={currentDictIndex} onAnswer={handleAnswer} />}
			{TEST_MODES_NAMES.inputWordMode === currentTestMode &&
				<InputWordMode dict={dict} currentDictIndex={currentDictIndex} onAnswer={handleAnswer} modeEnterHandlerRef={modeEnterHandlerRef} />}
			<div id='proceed-btn-container'>
				<Button onClick={handleProceed} disabled={!isAnswered} >Proceed</Button>
			</div>
		</div>
	)
}

// dict={dict} currentDictIndex={currentDictIndex} onAnswer={handleAnswer}