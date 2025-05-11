import './ModuleCard.scss'
import Button from '/src/ui/Button/Button'

export default function ({ children, id, title, onEdit, onLearn, ...props }) {
	return (
		<div className="content-wrapper">
			<div className="module-content">
				<h3 className='module-card-caption'>{title}</h3>
				<div className="module-card-button-container">
					<Button onClick={() => onEdit(id)}>Edit</Button>
					<Button onClick={() => onLearn(id)}>Learn</Button>
				</div>
			</div>
		</div>
	)
}