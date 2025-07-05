import { useEffect } from "react";


export default function (key, handler) {
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === key)
				handler(e)
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}
	}, [key, handler])
}