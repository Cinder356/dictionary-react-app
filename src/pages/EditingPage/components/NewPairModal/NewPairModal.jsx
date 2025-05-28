import { useContext } from "react";
import DictContext from "../../contexts/moduleData/ModuleDataContext";
import WordPairEditingModal from "/src/components/WordPairEditingModal/WordPairEditingModal"

export default function ({ modalOpenState, setModalOpenState }) {
	const { addPair } = useContext(DictContext)

	return (
		<WordPairEditingModal
			modalOpenState={modalOpenState}
			setModalOpenState={setModalOpenState}
			onSubmit={addPair}
		/>
	)
}