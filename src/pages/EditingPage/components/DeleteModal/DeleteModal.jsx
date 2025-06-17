import Modal from '@/ui/Modal/Modal'
import IconBtn from '@/ui/IconBtn/IconBtn'
import './DeleteModal.scss'

import CheckIcon from '@/app/icons/check.svg?react'
import CrossIcon from '@/app/icons/cross.svg?react'

export default function ({ isOpen, onClose, onDelete }) {

	return <Modal className='delete-module-modal' isOpen={isOpen} onSubmit={onDelete}>
		<h4 className='delete-modal-caption'>Do you really want to delete this module?</h4>
		<div className="delete-modal-button-container">
			<IconBtn onClick={onClose}><CrossIcon className='green-icon' /></IconBtn>
			<IconBtn onClick={onDelete}><CheckIcon className='red-icon' /></IconBtn>
		</div>
	</Modal>
}