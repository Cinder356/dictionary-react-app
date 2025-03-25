import { useEffect, useRef } from 'react'
import { createPortal } from "react-dom";
import './Modal.scss'

export default function Modal({ children, isOpen }) {
	if (!isOpen) return

	const dialogRef = useRef()

	useEffect(() => {
		if (isOpen)
			dialogRef.current.showModal()
		else
			dialogRef.current.close()
	}, [isOpen])

	return createPortal(
		<dialog ref={dialogRef}>{children}</dialog>,
		document.getElementById('modal')
	)
}