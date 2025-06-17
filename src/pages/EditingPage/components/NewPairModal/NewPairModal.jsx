import { useContext } from "react";
import DictContext from "../../contexts/moduleData/ModuleDataContext";
import WordPairEditingModal from "../WordPairEditingModal/WordPairEditingModal"

export default function ({ modalOpenState, setModalOpenState }) {
	const { addPair } = useContext(DictContext)

	return (
		<WordPairEditingModal
			isOpen={modalOpenState}
			onClose={() => setModalOpenState(false)}
			onSubmit={addPair}
		/>
	)
}