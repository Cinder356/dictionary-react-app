import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import LearningSettingsForm from "../LearningSettingsForm/LearningSettingsForm"
import { getModuleMeta } from '/src/app/helpers/moduleController'


export default function () {
	const [id, setId] = useState(-1)
	const { id: strID } = useParams()
	const numID = Number(strID)

	useEffect(() => {
		(async () => {
			if (Number.isNaN(numID) || numID < 0 || !(await getModuleMeta(numID))) {
				setId(-1)
				return
			}
			setId(numID)
		})()
	}, [numID])

	return (
		<>
			<LearningSettingsForm id={id} />
		</>
	)
}