import { useState, useEffect, useCallback } from 'react';
import { getModuleDictinary } from '../../../../app/helpers/moduleController'
import shuffleArray from '../../../../app/helpers/shuffleArray';
import Card from '../Card/Card';
import ProgressModal from '../ProgressModal/ProgressModal';
import './CardsDeck.scss'

const defaultProgressStats = { failedCount: 0, learnedCount: 0 }

export default function ({ id }) {
	const [dictionary, setDictionary] = useState([])
	const [currentPairIndex, setCurrentPairIndex] = useState(0)
	const [progressStats, setProgressStats] = useState(defaultProgressStats)

	useEffect(() => {
		if (id < 0) return
		getModuleDictinary(id).then((dict) => setDictionary(shuffleArray(dict)))
	}, [id])

	const handleLeftSwipe = useCallback(() => {
		setProgressStats(prev => ({ failedCount: prev.failedCount + 1, learnedCount: prev.learnedCount }))
		setCurrentPairIndex(prev => prev + 1)
	}, [])

	const handleRightSwipe = useCallback(() => {
		setProgressStats(prev => ({ failedCount: prev.failedCount, learnedCount: prev.learnedCount + 1 }))
		setCurrentPairIndex(prev => prev + 1)
	}, [])

	const handleRestart = useCallback(() => {
		setProgressStats(defaultProgressStats)
		setDictionary(prev => shuffleArray(prev))
		setCurrentPairIndex(0)
	}, [])

	return (
		<div className='deck-container'>
			{currentPairIndex < dictionary.length && <Card
				term={dictionary[currentPairIndex].left}
				translation={dictionary[currentPairIndex].right}
				onLeftSwipe={handleLeftSwipe}
				onRightSwipe={handleRightSwipe}
			/>}
			{currentPairIndex + 1 < dictionary.length && <div className='card-template second-card'>{dictionary[currentPairIndex + 1].left}</div>}
			{currentPairIndex + 2 < dictionary.length && <div className='card-template third-card' />}
			<ProgressModal
				isOpen={currentPairIndex === dictionary.length}
				fails={progressStats.failedCount}
				succeses={progressStats.learnedCount}
				onRestart={handleRestart}
			/>

			<div className='swipe-hints-container'>
				{/* <img src={arrowIcon} className='left-arrow' /> */}
				{/* <img src={arrowIcon} className='right-arrow' /> */}
			</div>
		</div>
	)
}