import { useState, useCallback, useEffect } from 'react'
import PageTitle from '../PageTitle/PageTitle'
import './Select.scss'

const DEFAULT_TEXT = 'Choose anything'

export default function ({ elementsArr, onChange, defaultKey = null, translate = 'yes', ...props }) { // я хз чё делать с defaultText
	const [isDropped, setIsDropped] = useState(false)
	const [currentSelection, setCurrentSelection] = useState({ key: null, value: null, text: DEFAULT_TEXT })

	useEffect(() => {
		if (!defaultKey) return
		const res = elementsArr.find((element) => element.key === defaultKey)
		if (res) setCurrentSelection(res)
	}, [elementsArr, defaultKey])

	const handleSelection = useCallback((key, value, text) => {
		setIsDropped(false)
		if (key == currentSelection.key) return
		setCurrentSelection({ key, value, text })
		onChange(value)
	}, [onChange, currentSelection])

	return (
		<div className='select' translate={translate} >
			<div className='current-selection' onClick={() => setIsDropped(prev => !prev)} {...props}>
				<p>{currentSelection.text}</p>
			</div>
			{isDropped && <div className='select-list'>
				{elementsArr.length === 0 && <PageTitle>Empty</PageTitle>}
				{elementsArr.map((elemParams) => <div translate={translate} className='select-list-element' key={elemParams.key} onClick={() => handleSelection(elemParams.key, elemParams.value, elemParams.text)}>{elemParams.text}</div>)}
			</div>}
			<span className='select-icon' />
		</div>
	)
}