import './ModuleCard.scss'
import Button from '/src/ui/Button/Button'

export default function ({ children, id, title, onEdit, ...props }) {
	return (
		<div className="content-wrapper">
			<div className="module-item-content">
				<h3>{title}</h3>
				<div className="module-card-button-container">
					<Button onClick={() => onEdit(id)}>Edit</Button>
					{/* <Button onClick={() => onOpen(id)}>Open</Button> */}
				</div>
			</div>
		</div>
	)
}