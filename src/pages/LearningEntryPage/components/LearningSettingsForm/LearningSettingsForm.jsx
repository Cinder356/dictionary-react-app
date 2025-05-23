import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import PageTitle from '/src/ui/PageTitle/PageTitle'
import Select from '../../../../ui/Select/Select'
import RadioGroup from '../../../../ui/RadioGroup/RadioGroup'
import Button from '../../../../ui/Button/Button'
import { getAllModulesMeta } from '../../../../app/helpers/moduleController'
import modes from '../../consts/modes'
import './LearningSettingsForm.scss'


export default function ({ moduleId }) {
	const navigate = useNavigate()
	const [modulesMeta, setModulesMeta] = useState([])
	const [currentModuleId, setCurrentModuleId] = useState()
	const [currentMode, setCurrentMode] = useState(modes[0].value)

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

	const handleStartBtn = useCallback(
		() => navigate(modes[parseInt(currentMode)].getPath(currentModuleId)),
		[currentMode, navigate, modes, currentModuleId]
	)

	return (
		<div className="content-wrapper">
			<PageTitle>Starting learning</PageTitle>
			<form action="">

				<div className='form-top-margin'>
					<label htmlFor="module-select"><b>Module:</b> {currentModuleId} </label>
					<Select
						id='module-select'
						elementsArr={selectElementsArr}
						defaultKey={moduleId}
						onChange={(val) => setCurrentModuleId(val)} />
				</div>

				<div className='form-top-margin'>
					<label htmlFor="modes-radio-group"><b>Learning mode:</b> {currentMode} </label>
					<RadioGroup id='modes-radio-group' options={modes} name='mode' defaultValue={modes[0].value} onChange={(val) => setCurrentMode(val)} />
				</div>

				<div id='start-button-container' className='form-top-margin'>
					<Button id='start-button' disabled={currentModuleId < 0} onClick={handleStartBtn}>Start</Button>
				</div>


			</form >
		</div >
	)
}