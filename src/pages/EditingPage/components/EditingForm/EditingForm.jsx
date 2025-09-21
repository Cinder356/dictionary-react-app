import { useNavigate } from "react-router-dom"
// import btnColors from "/src/app/consts/btnColors"
// import Button from "/src/ui/Button/Button"
import IconBtn from "@/ui/IconBtn/IconBtn"
import Input from "@/ui/Input/Input"
import PageTitle from "/src//ui/PageTitle/PageTitle"
import DeleteModal from "../DeleteModal/DeleteModal"
import ImportModal from "../ImportModal/ImportModal"
import { useCallback, useContext, useEffect, useState } from "react"
import { getModuleMeta, deleteModule } from '/src/app/helpers/moduleController'
import ModuleDataContext from "../../contexts/moduleData/ModuleDataContext"
import paths from '/src/app/consts/paths'
import saveModule from "../../helpers/saveModule"
import './EditingForm.scss'

import TrashIcon from '@/app/icons/trash.svg?react'
import FilePlusIcon from '@/app/icons/file-plus.svg?react'
import PlusIcon from '@/app/icons/plus.svg?react'
import CheckIcon from '@/app/icons/check.svg?react'


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
				<PageTitle>{id < 0 ? 'New module' : 'Module editing'} </PageTitle>

				<div>
					<label htmlFor="title"><b>Module title</b></label>
					<Input className="fully-stretched" type="text" value={moduleMetaData.title} onChange={(e) => handleTitleInput(e)} />
					<div className="form-btn-container">
						{id >= 0 && <IconBtn onClick={() => setDeleteModalModal(true)}><TrashIcon className='red-icon' /></IconBtn>}
						<IconBtn onClick={() => setImportModalState(true)}><FilePlusIcon className='secondary-icon' /></IconBtn>
						<IconBtn onClick={() => setModalOpenState(true)}><PlusIcon className='secondary-icon' /></IconBtn>
						{id < 0 && <IconBtn onClick={() => saveModule(id, dict, moduleMetaData, navigate)}><CheckIcon className='green-icon' /></IconBtn>}
						{/* {id >= 0 && <Button
							color={btnColors.RED}
							onClick={() => setDeleteModalModal(true)}>Delete</Button>}
						<Button onClick={() => setImportModalState(true)}>Import</Button>
						<Button className='fully-stretched' onClick={() => setModalOpenState(true)}>Add pair</Button>
						{id < 0 && <Button
							className='fully-stretched'
							color={btnColors.GREEN}
							onClick={() => saveModule(id, dict, moduleMetaData, navigate)}>Create</Button>} */}
					</div>
				</div>
			</div>
			<DeleteModal isOpen={deleteModalState} onClose={() => setDeleteModalModal(false)} onDelete={handleDeleteButton} />
			<ImportModal isOpen={importModalState} onClose={() => setImportModalState(false)} />
		</>
	)
}