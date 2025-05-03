import { openDB } from "idb";
import { DB_NAME, DB_VERSION, MODULES_DICTS_STORE_NAME, MODULES_METADATA_STORE_NAME } from "../consts/dbConsts";


/** @type {import('idb').IDBPDatabase} */
let dbPromise = null

export const getDB = () => {
	if (!dbPromise)
		dbPromise = openDB(DB_NAME, DB_VERSION, {
			upgrade(db) {
				if (!db.objectStoreNames.contains(MODULES_DICTS_STORE_NAME)) {
					db.createObjectStore(MODULES_DICTS_STORE_NAME, { keyPath: 'id' });
				}

				if (!db.objectStoreNames.contains(MODULES_METADATA_STORE_NAME)) {
					db.createObjectStore(MODULES_METADATA_STORE_NAME, { keyPath: 'id', autoIncrement: true });
				}
			},
		})
	return dbPromise
}