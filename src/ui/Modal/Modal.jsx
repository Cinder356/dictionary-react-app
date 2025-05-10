import { useEffect, useRef } from 'react'
import { createPortal } from "react-dom";
import './Modal.scss'

export default function Modal({ children, isOpen }) {
	const dialogRef = useRef()

	useEffect(() => {
		if (!dialogRef.current) return
		if (isOpen)
			dialogRef.current.showModal()
		else
			dialogRef.current.close()
	}, [isOpen])

	if (!isOpen) return null

	return createPortal(
		<dialog ref={dialogRef}>{children}</dialog>,
		document.getElementById('modal')
	)
}