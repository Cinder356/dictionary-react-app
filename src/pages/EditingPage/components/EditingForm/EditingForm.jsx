import { useNavigate } from "react-router-dom"
import btnColors from "/src/app/consts/btnColors"
import Button from "/src/ui/Button/Button"
import Input from "/src/ui/Input/Input"
import PageTitle from "/src//ui/PageTitle/PageTitle"
import DeleteModal from "../DeleteModal/DeleteModal"
import ImportModal from "../ImportModal/ImportModal"
import { useCallback, useContext, useEffect, useState } from "react"
import { getModuleMeta, deleteModule } from '/src/app/helpers/moduleController'
import ModuleDataContext from "../../contexts/moduleData/ModuleDataContext"
import paths from '/src/app/consts/paths'
import saveModule from "../../helpers/saveModule"

export default function ({ id, setModalOpenState }) {
	const navigate = useNavigate()
	const { dict, moduleMetaData, setModuleMetaData } = useContext(ModuleDataContext)
	const [deleteModalState, setDeleteModalModal] = useState(false)
	const [importModalState, setImportModalState] = useState(false)

	// loading meta
	useEffect(() => {
		if (id < 0) return
		(async () => {
			getModuleMeta(id).then(res => setModuleMetaData(res, false))
		})()
	}, [id])

	const handleTitleInput = useCallback((event) => {
		setModuleMetaData(prev => ({ ...prev, title: event.target.value }))
	}, [])

	const handleDeleteButton = useCallback(() => {
		if (id < 0) return
		deleteModule(id)
		navigate(paths.getView())
	}, [id, navigate])

	return (
		<>
			<div className="content-wrapper">
				<PageTitle>{id < 0 ? 'New' : 'Editing'} module: {id}</PageTitle>

				<div>
					<label htmlFor="title"><b>Module title</b></label>
					<Input className="fully-stretched" type="text" value={moduleMetaData.title} onChange={(e) => handleTitleInput(e)} />
					<div className="button-line-wrapper">
						<Button color={btnColors.RED} onClick={() => setDeleteModalModal(true)}>Delete</Button>
						<Button onClick={() => setImportModalState(true)}>Import</Button>
						<Button className='fully-stretched' onClick={() => setModalOpenState(true)}>Add pair</Button>
						{id < 0 && <Button
							className='fully-stretched'
							color={btnColors.GREEN}
							onClick={() => saveModule(id, dict, moduleMetaData, navigate)}>Create</Button>}
					</div>
				</div>
			</div>
			<DeleteModal isOpen={deleteModalState} onClose={() => setDeleteModalModal(false)} onDelete={handleDeleteButton} />
			<ImportModal isOpen={importModalState} onClose={() => setImportModalState(false)} />
		</>
	)
}