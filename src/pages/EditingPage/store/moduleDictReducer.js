import moduleDictActions from "../consts/moduleDictActions"

export default (moduleDict, { type, ...payload }) => {
	switch (type) {
		case moduleDictActions.ADD:
			return moduleDict.concat({
				id: moduleDict.length > 0 ? moduleDict[moduleDict.length - 1].id + 1 : 0,
				left: payload?.left,
				right: payload?.right
			})
		case moduleDictActions.REMOVE:
			return payload.hasOwnProperty('id') ? moduleDict.filter(obj => obj.id != payload.id) : moduleDict
		case moduleDictActions.EDIT:
			if (!(payload.hasOwnProperty('id') || payload.hasOwnProperty('left') || payload.hasOwnProperty('right'))) throw Error('Not enough arguments')
			const transaltionIndex = moduleDict.findIndex(translation => translation.id === payload.id)
			if (transaltionIndex < 0) return moduleDict
			const newArr = [...moduleDict]
			newArr[transaltionIndex] = {
				id: payload.id,
				left: payload.left,
				right: payload.right
			}
			return newArr
		case moduleDictActions.SET:
			if (!payload.hasOwnProperty('dict')) throw Error('Not enough arguments')
			return payload.dict;
	}
	throw Error('Unknown action')
}