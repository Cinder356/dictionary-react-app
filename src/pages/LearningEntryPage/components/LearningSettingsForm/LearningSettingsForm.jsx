import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { isSession, useNavigate } from "react-router-dom"
import PageTitle from '/src/ui/PageTitle/PageTitle'
import Select from '@/ui/Select/Select'
import RadioGroup from '@/ui/RadioGroup/RadioGroup'
import Button from '@/ui/Button/Button'
import { getAllModulesMeta } from '@/app/helpers/moduleController'
import modes from '../../consts/modes'
import './LearningSettingsForm.scss'
import LearningParamsChanger from '../LearningParamsChanger/LearningParamsChanger'

export default function ({ moduleId }) {
	const navigate = useNavigate()
	const [modulesMeta, setModulesMeta] = useState([])
	const [currentModuleId, setCurrentModuleId] = useState()
	const [currentModeIndex, setCurrentModeIndex] = useState(modes[0].value)
	const learningParamsRef = useRef({
		isReverse: false,
	})

	useEffect(() => {
		getAllModulesMeta().then((val) => setModulesMeta(val))
	}, [])

	useEffect(() => setCurrentModuleId(moduleId), [moduleId])

	const selectElementsArr = useMemo(() => { // крч map создаёт постоянно новый массив, из-за этого Select постоянно ререндерился 
		return modulesMeta.map((moduleMeta) => ({
			key: moduleMeta.id,
			value: moduleMeta.id,
			text: moduleMeta.title
		}));
	}, [modulesMeta]);

	const handleStartBtn = useCallback(() => {
		const searchParams = new URLSearchParams()
		for (const key in learningParamsRef.current) {
			if (modes[currentModeIndex].requiredParams.includes(key))
				searchParams.append(key, learningParamsRef.current[key])
		}
		navigate({
			pathname: modes[currentModeIndex].getPath(currentModuleId),
			search: searchParams.toString()
		})
	}, [currentModeIndex, navigate, modes, currentModuleId])

	return (
		<div className="content-wrapper">
			<PageTitle>Starting learning</PageTitle>

			<form action="">

				<div className='form-top-margin'>
					<label htmlFor="module-select"><b>Module:</b></label>
					<Select
						id='module-select'
						translate='no'
						elementsArr={selectElementsArr}
						defaultKey={moduleId}
						onChange={(val) => setCurrentModuleId(val)} />
				</div>

				<div className='form-top-margin'>
					<label htmlFor="modes-radio-group"><b>Learning mode:</b></label>
					<RadioGroup id='modes-radio-group' options={modes} name='mode' defaultValue={modes[0].value} onChange={(val) => setCurrentModeIndex(val)} />
				</div>

				<LearningParamsChanger learningParamsRef={learningParamsRef} currentModeIndex={currentModeIndex} className='form-top-margin' />

				<div id='start-button-container'>
					<Button id='start-button' disabled={currentModuleId < 0} onClick={handleStartBtn}>Start</Button>
				</div>
			</form >
		</div >
	)
}