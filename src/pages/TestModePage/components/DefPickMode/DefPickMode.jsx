import { useEffect, useState, useCallback, useRef } from 'react'
import TestAnswer from '../TestAnswer/TestAnswer'
import PageTitle from '@/ui/PageTitle/PageTitle'
import './DefPickMode.scss'
import TermCaption from '../TermCaption/TermCaption'

const MAX_ADDITIONAL_DEFS_AMOUNT = 3

export default function ({ dict, currentDictIndex, onAnswer }) {
	const [definitions, setDefinitions] = useState([])
	const [highlightedAnswersI, setHighlightedAnswersI] = useState({ correct: -1, wrong: -1 })
	const isCompletedRef = useRef(false)
	const correctIndexRef = useRef(-1)

	useEffect(() => {
		if (dict.length <= 0) return

		const correctDefinition = dict[currentDictIndex].right
		const tempDefinitions = []
		let additionalDefsAmount = MAX_ADDITIONAL_DEFS_AMOUNT
		if (dict.length - 1 <= additionalDefsAmount)
			additionalDefsAmount = dict.length - 1
		while (tempDefinitions.length != additionalDefsAmount) {
			const currentDefinition = dict[Math.floor(Math.random() * dict.length)].right
			if (currentDefinition == correctDefinition || tempDefinitions.includes(currentDefinition))
				continue
			tempDefinitions.push(currentDefinition)
		}
		const correctIndex = Math.floor(Math.random() * tempDefinitions.length)
		tempDefinitions.splice(correctIndex, 0, correctDefinition)

		isCompletedRef.current = false
		correctIndexRef.current = correctIndex
		setDefinitions(tempDefinitions)
		setHighlightedAnswersI({ correct: -1, wrong: -1 })
	}, [dict, currentDictIndex])

	const handleChoice = useCallback((selectedIndex) => {
		if (isCompletedRef.current) return
		setHighlightedAnswersI({
			correct: correctIndexRef.current,
			wrong: correctIndexRef.current === selectedIndex ? -1 : selectedIndex
		})
		isCompletedRef.current = true
		onAnswer(selectedIndex === correctIndexRef.current)
	}, [currentDictIndex, definitions])

	return (
		<>
			<TermCaption>{dict[currentDictIndex].left}</TermCaption>
			<div className='test-answers-container'>
				{definitions?.map((definition, index) => <TestAnswer
					key={index}
					isCorrect={index === highlightedAnswersI.correct}
					isWrong={index === highlightedAnswersI.wrong}
					definition={definition}
					onClick={() => handleChoice(index)}
				/>)}
			</div>
		</>
	)
}