import { useCallback, useReducer } from 'react';
import moduleDictReducer from '../../store/moduleDictReducer';
import moduleDictActions from '../../consts/moduleDictActions';
import DictContext from './DictContext';

// Провайдер
export default function ({ children, setDataSavingState }) {
	const [dict, moduleDictDispatch] = useReducer(moduleDictReducer, []);

	const moduleDictDispatchMiddleware = useCallback((args) => {
		return moduleDictDispatch(args)
	}, []) // не добовляем в зависимости setDataSavingState и moduleDictDispatch, потому-что react гарантирует, что сеттеры имеют однуи ту же ссылку

	const addPair = useCallback((newPair = {}) => {
		if (!newPair || newPair.left.length === 0 || newPair.right.length === 0)
			return;
		moduleDictDispatchMiddleware({ type: moduleDictActions.ADD, ...newPair })
		setDataSavingState(false)
	}, [moduleDictDispatchMiddleware])

	const removePair = useCallback((id = -1) => {
		if (id < 0) return
		moduleDictDispatchMiddleware({ type: moduleDictActions.REMOVE, id })
		setDataSavingState(false)
	}, [moduleDictDispatchMiddleware])

	const editPair = useCallback((id = -1, pair = {}) => {
		if (id < 0 && !pair) return
		moduleDictDispatchMiddleware({ type: moduleDictActions.EDIT, ...pair, id })
		setDataSavingState(false)
	}, [moduleDictDispatchMiddleware])

	const setDict = useCallback((newDict) => {
		moduleDictDispatchMiddleware({ type: moduleDictActions.SET, dict: newDict }) // there is no data saving state updating
	}, [moduleDictDispatchMiddleware])

	return (
		<DictContext.Provider value={{ dict, addPair, removePair, editPair, setDict }}>
			{children}
		</DictContext.Provider >
	);
};