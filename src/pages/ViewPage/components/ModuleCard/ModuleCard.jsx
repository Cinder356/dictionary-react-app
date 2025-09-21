import './ModuleCard.scss'
import IconBtn from '@/ui/IconBtn/IconBtn'
import PenSquareIcon from '@/app/icons/pen-square.svg?react'
import TestIcon from '@/app/icons/test.svg?react'

export default function ({ children, id, title, onEdit, onLearn, ...props }) {
	return (
		<div className="content-wrapper module-content-wrapper">
			<div className="module-content">
				<h3 translate='no' className='module-card-caption'>{title}</h3>
				<div className="module-card-button-container">
					<IconBtn onClick={() => onEdit(id)}><PenSquareIcon className='secondary-icon' /></IconBtn>
					<IconBtn onClick={() => onLearn(id)}><TestIcon className='secondary-icon' /></IconBtn>
				</div>
			</div>
		</div>
	)
}