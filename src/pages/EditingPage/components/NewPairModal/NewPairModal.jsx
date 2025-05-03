import { useContext } from "react";
import DictContext from "../../contexts/dict/DictContext";
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