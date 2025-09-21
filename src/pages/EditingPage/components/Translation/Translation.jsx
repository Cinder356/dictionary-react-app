import './Translation.scss'
import IconBtn from '@/ui/IconBtn/IconBtn'
import WordPairEditingModal from '../WordPairEditingModal/WordPairEditingModal'
import { useState } from 'react'
import PenSquareIcon from '@/app/icons/pen-square.svg?react'
import TrashIcon from '@/app/icons/trash.svg?react'

export default function Translation({ id, left = '', right = '', onRemove, onEdit, }) {
	const [modalOpenState, setModalOpenState] = useState(false)

	return (
		<div className='translation-block content-wrapper'>
			<IconBtn onClick={() => onRemove(id)} ><TrashIcon className='red-icon' /></IconBtn>
			<div className="pair">
				<h4 className='pair-word' translate='no'>{left}</h4>
				<h3>:</h3>
				<h4 className='pair-word' translate='no'>{right}</h4>
			</div>
			<IconBtn onClick={() => setModalOpenState(true)} ><PenSquareIcon className='secondary-icon' /></IconBtn>
			{modalOpenState && ( // из-за того, что тут стоит проверка, реакт пересоздаёт модалку при удачной проверке, блягодаря чем left и right обновляются. иначе пришлось бы использовать стейты для left и right вместе с useEffect
				<WordPairEditingModal
					isOpen={modalOpenState}
					onClose={() => setModalOpenState(false)}
					onSubmit={pair => onEdit(id, pair)}
					closeOnSubmit={true}
					leftDefault={left}
					rightDefault={right}
				/>
			)}
		</div>
	)
}