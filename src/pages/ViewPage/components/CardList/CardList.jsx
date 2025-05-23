import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllModulesMeta } from '/src/app/helpers/moduleController'
import paths from '/src/app/consts/paths'
import Button from '/src/ui/Button/Button'
import ModuleCard from "../ModuleCard/ModuleCard"


export default function () {
	const navigate = useNavigate()
	const [modulesMeta, setModulesMeta] = useState([])

	const loadModules = useCallback(() => getAllModulesMeta().then(setModulesMeta))

	useEffect(() => {
		loadModules()
		const timetoutPromise = setTimeout(loadModules, 250)
		return () => clearTimeout(timetoutPromise)
	}, [])

	return (
		<div className="card-list">
			<div className="content-wrapper">
				<Button className='fully-stretched' isTransparent={true} onClick={() => navigate(paths.getEditing(-1))} >New module</Button>
			</div>
			{modulesMeta.map(moduleMeta =>
				<ModuleCard key={moduleMeta.id} title={moduleMeta.title} onEdit={() => navigate(paths.getEditing(moduleMeta.id))} onLearn={() => navigate(paths.getLearn(moduleMeta.id))} />
			)}
		</div>
	)
}