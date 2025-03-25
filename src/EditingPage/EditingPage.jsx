import { useReducer, useState } from "react"
import Button from '../Button/Button'
import './EditingPage.scss'
import Translation from "../Translation/Translation"
import WordPairEditingModal from "../WordPairEditingModal/WordPairEditingModal"
import { ModuleDictActions } from "./moduleDictActions"

const moduleDictReducer = (moduleDict, { type, ...payload }) => {
	switch (type) {
		case ModuleDictActions.ADD:
			return moduleDict.concat({
				id: moduleDict.length > 0 ? moduleDict[moduleDict.length - 1].id + 1 : 0,
				left: payload.hasOwnProperty('left') ? payload.left : '',
				right: payload.hasOwnProperty('right') ? payload.right : ''
			})
		case ModuleDictActions.REMOVE:
			return payload.hasOwnProperty('id') ? moduleDict.filter(obj => obj.id != payload.id) : moduleDict
		case ModuleDictActions.EDIT:
			if (!(payload.hasOwnProperty('id') || payload.hasOwnProperty('left') || payload.hasOwnProperty('right'))) return
			const transaltionIndex = moduleDict.findIndex(translation => translation.id === payload.id)
			if (transaltionIndex < 0) return moduleDict
			const newArr = [...moduleDict]
			newArr[transaltionIndex] = {
				id: payload.id,
				left: payload.left,
				right: payload.right
			}
			return newArr
	}
	throw Error('Unknown action')
}

export default function CreatePage() {
	const [modalOpenState, setModalOpenState] = useState(false)

	const [moduleDict, moduleDictDispatch] = useReducer(moduleDictReducer, [{
		id: 0,
		left: 'cat',
		right: 'кошка'
	}]);

	const addWordsPair = (newPair) => {
		if (newPair.left.length === 0 || newPair.right.length === 0)
			return;
		moduleDictDispatch({ type: ModuleDictActions.ADD, ...newPair })
	}

	return (
		<>
			<div className="content-wrapper">
				<h2 style={{ textAlign: 'center' }}>Editing module</h2>

				<form action="">
					<label htmlFor="title"><b>Module title</b></label>
					<input className="control fully-stretched" type="text" />
					<div className="button-line-container">
						<Button className='fully-stretched' type='button' isActive={true} onClick={() => setModalOpenState(true)}>New translation</Button>
						<Button className='fully-stretched' type='button' isActive={true} onClick={() => setModalOpenState(true)}>New translation</Button>
						<Button className='fully-stretched' type='button' isActive={true} onClick={() => setModalOpenState(true)}>New translation</Button>
						<Button className='fully-stretched' type='button' isActive={true} onClick={() => setModalOpenState(true)}>New translation</Button>
					</div>
				</form>
			</div>
			<WordPairEditingModal
				modalOpenState={modalOpenState}
				setModalOpenState={setModalOpenState}
				onSubmit={addWordsPair}
			/>
			{moduleDict.map(translation => <Translation key={translation.id} moduleDictDispatch={moduleDictDispatch} id={translation.id} left={translation.left} right={translation.right} />)}
		</>
	)
}