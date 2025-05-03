import Modal from '/src/ui/Modal/Modal'
import Button from '/src/ui/Button/Button'
import './DeleteModal.scss'

export default function ({ isOpen, onClose, onDelete }) {
	return (
		<Modal className='delete-modal' isOpen={isOpen}>
			<Button onClick={onClose}>Close</Button>
			<Button onClick={onDelete}>Delete</Button>
		</Modal>
	)
}