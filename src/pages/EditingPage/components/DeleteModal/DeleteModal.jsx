import Modal from '/src/ui/Modal/Modal'
import Button from '/src/ui/Button/Button'
import btnColors from '/src/app/consts/btnColors'
import './DeleteModal.scss'

export default function ({ isOpen, onClose, onDelete }) {

	return <Modal isOpen={isOpen}>
		<h4 className='delete-modal-caption'>Do you really want to delete this module?</h4>
		<div className="delete-modal-button-container">
			<Button onClick={onClose}>Close</Button>
			<Button onClick={onDelete} color={btnColors.RED}>Delete</Button>
		</div>
	</Modal>
}