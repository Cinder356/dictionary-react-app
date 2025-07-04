import { useState, useCallback } from 'react';
import shuffleArray from '@/app/helpers/shuffleArray';
import PageTitle from '@/ui/PageTitle/PageTitle';
import Card from '../Card/Card';
import ProgressModal from '@/components/ProgressModal/ProgressModal';
import './CardsDeck.scss'
import useUrlMixedDict from "@/app/hooks/useUrlMixedDict";

const defaultProgressStats = { failedCount: 0, learnedCount: 0 }

export default function ({ id }) {
	const [dictionary, setDictionary] = useUrlMixedDict(id)
	const [currentPairIndex, setCurrentPairIndex] = useState(0)
	const [progressStats, setProgressStats] = useState(defaultProgressStats)

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

	if (dictionary.length === 0)
		return <div className='content-wrapper'><PageTitle>Empty module</PageTitle></div>

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
				isOpen={currentPairIndex === dictionary.length && dictionary.length > 0}
				fails={progressStats.failedCount}
				succeses={progressStats.learnedCount}
				onRestart={handleRestart}
			/>

			<div className='swipe-hints-container'>
				<svg className='left-arrow' width="48" height="48" viewBox="0 0 48 48" fill="none">
					<path d="M36 24C28 20 20 20 12 24" strokeWidth="3"
						strokeLinecap="round" strokeLinejoin="round" />
					<path d="M18 18L12 24L18 30" strokeWidth="3"
						strokeLinecap="round" strokeLinejoin="round" />
				</svg>

				<svg className='right-arrow' width="48" height="48" viewBox="0 0 48 48" fill="none">
					<path d="M12 24C20 20 28 20 36 24" strokeWidth="3"
						strokeLinecap="round" strokeLinejoin="round" />
					<path d="M30 18L36 24L30 30" strokeWidth="3"
						strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
		</div>
	)
}