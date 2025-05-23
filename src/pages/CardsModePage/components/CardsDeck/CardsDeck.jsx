import { useState, useEffect, useCallback } from 'react';
import { getModuleDictinary } from '../../../../app/helpers/moduleController'
import Card from '../Card/Card';
import './CardsDeck.scss'

export default function ({ id }) {
	const [dictionary, setDictionary] = useState([{ left: 'empty', right: 'пусто' }])
	const [currentPairIndex, setCurrentPairIndex] = useState(0)

	useEffect(() => {
		if (id < 0) return
		getModuleDictinary(id).then((dict) => setDictionary(dict))
	}, [id])

	useEffect(() => {
		console.log(currentPairIndex)
	}, [currentPairIndex])

	return (
		<div className='deck-container'>
			<Card
				term={dictionary[currentPairIndex].left}
				translation={dictionary[currentPairIndex].right}
				onSwipe={() => setCurrentPairIndex(prev => prev + 1)}
			/>
		</div>
	)
}