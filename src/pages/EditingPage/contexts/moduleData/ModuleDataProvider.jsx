import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import moduleDictReducer from '../../store/moduleDictReducer';
import moduleDictActions from '../../consts/moduleDictActions';
import ModuleDataContext from './ModuleDataContext';
import useDebouncedSave from '../../hooks/useDebouncedSave';

const SAVING_DELAY = 1000

export default function ({ children, id }) {
	const [dict, moduleDictDispatch] = useReducer(moduleDictReducer, []);
	const [moduleMetaData, setModuleMetaData] = useState({
		title: ''
	})

	const idRef = useRef(id)
	const isSavedRef = useRef(true)
	const debouncedSave = useDebouncedSave(SAVING_DELAY)

	useEffect(() => { idRef.current = id }, [id, idRef])

	//autosave
	useEffect(() => {
		if (isSavedRef.current) return
		debouncedSave(idRef.current, dict, moduleMetaData)
		isSavedRef.current = true
	}, [isSavedRef, debouncedSave, idRef, dict, moduleMetaData])

	// metadata
	const setModuleMetaDataMiddleware = useCallback((args, whetherToSave = true) => {
		setModuleMetaData(args)
		if (whetherToSave && idRef.current > -1)
			isSavedRef.current = false
	}, [idRef, isSavedRef])

	// dictionary
	const moduleDictDispatchMiddleware = useCallback((args, whetherToSave) => {
		moduleDictDispatch(args)
		if (whetherToSave && idRef.current > -1)
			isSavedRef.current = false
	}, [idRef, isSavedRef]) // не добовляем в зависимости setDataSavingState и moduleDictDispatch, потому-что react гарантирует, что сеттеры имеют однуи ту же ссылку

	const addPair = useCallback((newPair = {}, whetherToSave = true) => {
		if (!newPair || newPair.left.length === 0 || newPair.right.length === 0) return
		moduleDictDispatchMiddleware({ type: moduleDictActions.ADD, ...newPair }, whetherToSave)
	}, [moduleDictDispatchMiddleware])

	const removePair = useCallback((pairId = -1, whetherToSave = true) => {
		if (pairId < 0) return
		moduleDictDispatchMiddleware({ type: moduleDictActions.REMOVE, id: pairId }, whetherToSave)
	}, [moduleDictDispatchMiddleware])

	const editPair = useCallback((pairId = -1, pair = {}, whetherToSave = true) => {
		if (pairId < 0 && !pair) return
		moduleDictDispatchMiddleware({ type: moduleDictActions.EDIT, ...pair, id: pairId }, whetherToSave)
	}, [moduleDictDispatchMiddleware])

	const setDict = useCallback((newDict, whetherToSave = true) => {
		moduleDictDispatchMiddleware({ type: moduleDictActions.SET, dict: newDict }, whetherToSave) // there is no data saving state updating
	}, [moduleDictDispatchMiddleware])

	return (
		<ModuleDataContext.Provider value={{ dict, addPair, removePair, editPair, setDict, moduleMetaData, setModuleMetaData: setModuleMetaDataMiddleware }}>
			{children}
		</ModuleDataContext.Provider >
	);
};