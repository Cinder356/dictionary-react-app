import { getDB } from "./db";
import { MODULES_DICTS_STORE_NAME, MODULES_METADATA_STORE_NAME } from "../consts/dbConsts";

export const addModule = async (moduleMeta, dictionary) => {
	const db = await getDB()
	// кароче из-за того, что getDB возвращает именно промис db,
	// тогда нужно использовать await для получения самой db, не смотря на то, что это sync func
	// return db.add(MODULES_STORE_NAME, module)
	const id = await db.add(MODULES_METADATA_STORE_NAME, moduleMeta)
	return db.add(MODULES_DICTS_STORE_NAME, { dictionary, id })
}

export const getAllModulesMeta = async () => {
	const db = await getDB()
	return db.getAll(MODULES_METADATA_STORE_NAME)
}

export const getModuleMeta = async (id) => {
	const db = await getDB()
	return db.get(MODULES_METADATA_STORE_NAME, id)
}

export const getModuleDictinary = async (id) => {
	const db = await getDB()
	return (await db.get(MODULES_DICTS_STORE_NAME, id)).dictionary
}

export const editModule = async (id, moduleMeta, dictionary) => {
	const db = await getDB()
	const oldMeta = await db.get(MODULES_METADATA_STORE_NAME, id)
	if (!oldMeta) return undefined
	await db.put(MODULES_DICTS_STORE_NAME, { id, dictionary })
	return db.put(MODULES_METADATA_STORE_NAME, { id, ...moduleMeta })
}

export const deleteModule = async (id) => {
	const db = await getDB()
	await db.delete(MODULES_DICTS_STORE_NAME, id)
	return db.delete(MODULES_METADATA_STORE_NAME, id)
}