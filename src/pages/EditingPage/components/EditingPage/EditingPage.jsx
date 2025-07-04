import { useState } from "react"
import EditingForm from "../EditingForm/EditingForm"
import PairList from "../PairList/PairList"
import NewPairModal from '../NewPairModal/NewPairModal'
import ModuleDataProvider from "../../contexts/moduleData/ModuleDataProvider"
import useUrlValidModuleId from "@/app/hooks/useUrlValidModuleId"

export default function CreatePage() {
	const [modalOpenState, setModalOpenState] = useState(false)
	const id = useUrlValidModuleId()

	return (
		<ModuleDataProvider id={id} >
			<EditingForm id={id} setModalOpenState={setModalOpenState} />
			<NewPairModal modalOpenState={modalOpenState} setModalOpenState={setModalOpenState} />
			<PairList id={id} />
		</ModuleDataProvider>
	)
}