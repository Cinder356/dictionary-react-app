import { useEffect, useRef } from "react";


export default function (key, handler) {
	const isAvailableRef = useRef(true)
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === key && isAvailableRef.current)
				handler()
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			console.log('there')
			window.removeEventListener('keydown', handleKeyDown);
		}
	}, [key, handler])
	return isAvailableRef
}