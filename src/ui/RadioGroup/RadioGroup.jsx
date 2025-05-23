import { useState, useCallback, useMemo } from 'react'
import './RadioGroup.scss'

export default function ({ options, name, defaultValue, onChange }) {
	const [currentValue, setCurrentValue] = useState(defaultValue)

	const handleChange = useCallback((event) => {
		setCurrentValue(event.target.value)
		onChange(event.target.value)
	}, [])

	// const radioButtons = useMemo(() => , [options, name, currentValue, handleChange])

	return (
		<div className='radio-group-container'>
			{options.map((option) =>
				<label className={'radio-button' + (currentValue === option.value ? (' ' + 'checked') : '')} key={option.value}>
					<input
						className='radio-element'
						type="radio"
						name={name}
						value={option.value}
						onChange={handleChange}
					/>
					{option.component}
				</label>)}
		</div>
	)
}