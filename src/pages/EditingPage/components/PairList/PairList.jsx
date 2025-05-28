import { useContext, useEffect } from "react"
import Translation from "../Translation/Translation"
import { getModuleDictinary, addModule } from '/src/app/helpers/moduleController'
import ModuleDataContext from "../../contexts/moduleData/ModuleDataContext"

export default function ({ id }) {
	const { dict, addPair, removePair, editPair, setDict } = useContext(ModuleDataContext)

	//loading dict
	useEffect(() => {
		if (id < 0) return
		getModuleDictinary(id).then(loadedDict => setDict(loadedDict, false))
	}, [id])

	return (
		<div className="pair-list">
			{dict.map(translation => <Translation key={translation.id} id={translation.id} left={translation.left} right={translation.right} onRemove={removePair} onEdit={editPair} />)}
		</div>
	)
}