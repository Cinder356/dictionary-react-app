import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EditingForm from "../EditingForm/EditingForm"
import PairList from "../PairList/PairList"
import NewPairModal from '../NewPairModal/NewPairModal'
import DictProvider from "../../contexts/dict/DictProvider"
import { getModuleMeta } from "/src/app/helpers/moduleController"

export default function CreatePage() {
	const [modalOpenState, setModalOpenState] = useState(false)
	const [dataSavingState, setDataSavingState] = useState(true)
	const [isNew, setIsNew] = useState(true)
	const { id: strID } = useParams();
	const id = Number(strID)

	useEffect(() => {
		(async () => {
			setIsNew(Number.isNaN(id) || id < 0 || !(await getModuleMeta(id)))
		})()
	}, [id])

	return (
		<DictProvider setDataSavingState={setDataSavingState}>
			<EditingForm id={id} isNew={isNew} dataSavingState={dataSavingState} setDataSavingState={setDataSavingState} setModalOpenState={setModalOpenState} />
			<NewPairModal modalOpenState={modalOpenState} setModalOpenState={setModalOpenState} />
			<PairList id={id} isNew={isNew} setDataSavingState={setDataSavingState} />
		</DictProvider>
	)
}