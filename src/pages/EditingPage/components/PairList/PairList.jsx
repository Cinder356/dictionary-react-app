import { useContext, useEffect } from "react"
import Translation from "/src/components/Translation/Translation"
import { getModuleDictinary, addModule } from '/src/app/helpers/moduleController'
import DictContext from "../../contexts/dict/DictContext"

export default function ({ id, isNew, setDataSavingState }) {
	const { dict, addPair, removePair, editPair, setDict } = useContext(DictContext)

	useEffect(() => {
		if (isNew) return
		getModuleDictinary(id).then(loadedDict => setDict(loadedDict))
	}, [isNew])

	return (
		<div className="pair-list">
			{dict.map(translation => <Translation key={translation.id} id={translation.id} left={translation.left} right={translation.right} onRemove={removePair} onEdit={editPair} />)}
		</div>
	)
}