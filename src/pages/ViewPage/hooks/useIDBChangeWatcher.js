import { useEffect } from "react";

// export default function (storeName, callback) {
// 	useEffect(() => {
// 		const db = getDB()
// 		const store = db.transaction(storeName).objectStore(storeName)

// 		const handler = (event) => callback(event)
// 		store.addEventListener('change', handler)

// 		return () => store.removeEventListener('change', handler) // returns cleaning function
// 	}, [storeName, callback])
// }


// db.transaction(storeName).objectStore(storeName).addEventListener('change', (event) => {
// 	if (isMounted) {
// 		callback(event);
// 	}
// });