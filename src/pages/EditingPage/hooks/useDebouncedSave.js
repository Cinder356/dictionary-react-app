import { useRef, useCallback } from "react"
import saveModule from "../helpers/saveModule"

export default function (delay = 1000) {
	const currentTimeout = useRef()

	return useCallback((id, dict, moduleMetaData, navigate = null) => {
		if (currentTimeout.current)
			clearTimeout(currentTimeout.current)
		const newTimeout = setTimeout(() => saveModule(id, dict, moduleMetaData, navigate), delay)
		currentTimeout.current = newTimeout
	}, [currentTimeout, delay])
}