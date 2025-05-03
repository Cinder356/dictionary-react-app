import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllModulesMeta } from '/src/app/helpers/moduleController'
import paths from '/src/app/consts/paths'
import Button from '/src/ui/Button/Button'
import ModuleCard from "../ModuleCard/ModuleCard"


export default function () {
	const navigate = useNavigate()
	const [modulesMeta, setModulesMeta] = useState([])

	useEffect(() => {
		getAllModulesMeta().then(setModulesMeta)
	}, [])

	return (
		<div className="card-list">
			<div className="content-wrapper">
				<Button className='fully-stretched' isTransparent={true} onClick={() => navigate(paths.editing(-1))} >New module</Button>
			</div>
			{modulesMeta.map(moduleMeta =>
				<ModuleCard key={moduleMeta.id} title={moduleMeta.title} onEdit={() => navigate(paths.editing(moduleMeta.id))} />
			)}
		</div>
	)
}