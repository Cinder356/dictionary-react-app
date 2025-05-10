import { useNavigate } from "react-router-dom"
import btnColors from "/src/app/consts/btnColors"
import Button from "/src/ui/Button/Button"
import Input from "/src/ui/Input/Input"
import PageTitle from "/src//ui/PageTitle/PageTitle"
import DeleteModal from "../DeleteModal/DeleteModal"
import { useCallback, useContext, useEffect, useState } from "react"
import { getModuleMeta, addModule, editModule, deleteModule } from '/src/app/helpers/moduleController'
import DictContext from "../../contexts/dict/DictContext"
import paths from '/src/app/consts/paths'

export default function ({ id, isNew, dataSavingState, setDataSavingState, setModalOpenState }) {
	const { dict } = useContext(DictContext)
	const navigate = useNavigate()
	const [deleteModalState, setDeleteModalModal] = useState(false)
	const [moduleMetaData, setModuleMetaData] = useState({
		title: ''
	})

	useEffect(() => {
		if (isNew) return
		(async () => {
			getModuleMeta(id).then(res => setModuleMetaData(res))
		})()
	}, [isNew])

	const saveModule = useCallback(() => {
		(async () => {
			if (isNew) {
				const receivedID = await addModule(moduleMetaData, dict)
				navigate(paths.editing(receivedID))
				return
			}
			return editModule(id, moduleMetaData, dict)
		})()
		setDataSavingState(true)
	}, [moduleMetaData, dict])

	const handleTitleInput = useCallback((event) => {
		setModuleMetaData(prev => ({ ...prev, title: event.target.value }))
		setDataSavingState(false)
	}, [])

	const handleDeleteButton = useCallback(() => {
		if (isNew) return
		deleteModule(id)
		navigate(paths.view)
	}, [id, isNew, navigate])

	return (
		<>
			<div className="content-wrapper">
				<PageTitle>{isNew ? 'New' : 'Editing'} module</PageTitle>

				<form action="">
					<label htmlFor="title"><b>Module title</b></label>
					<Input className="fully-stretched" type="text" value={moduleMetaData.title} onChange={(e) => handleTitleInput(e)} />
					<div className="button-line-wrapper">
						<Button color={btnColors.RED} onClick={() => setDeleteModalModal(true)}>Delete</Button>
						<Button className='fully-stretched' onClick={() => setModalOpenState(true)}>Add pair</Button>
						<Button
							className='fully-stretched'
							color={btnColors.GREEN}
							disabled={dataSavingState}
							onClick={saveModule}>Save</Button>
					</div>
				</form>
			</div>
			<DeleteModal isOpen={deleteModalState} onClose={() => setDeleteModalModal(false)} onDelete={handleDeleteButton} />
		</>
	)
}