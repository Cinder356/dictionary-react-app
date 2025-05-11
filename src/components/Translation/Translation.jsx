import './Translation.scss'
import btnColors from '../../app/consts/btnColors'
import Button from '../../ui/Button/Button'
import WordPairEditingModal from '../WordPairEditingModal/WordPairEditingModal'
import { useState } from 'react'

export default function Translation({ id, left = '', right = '', onRemove, onEdit, }) {
	const [modalOpenState, setModalOpenState] = useState(false)

	return (
		<div className='translation-block content-wrapper'>
			<div className="pair">
				<h4 className='pair-word'>{left}</h4>
				<h3>:</h3>
				<h4 className='pair-word'>{right}</h4>
			</div>
			<div className="control-panel">
				<Button
					color={btnColors.RED}
					onClick={() => onRemove(id)}
				>Delete</Button>
				<Button onClick={() => setModalOpenState(true)}>Edit</Button>
			</div>
			{modalOpenState && ( // из-за того, что тут стоит проверка, реакт пересоздаёт модалку при удачной проверке, блягодаря чем left и right обновляются. иначе пришлось бы использовать стейты для left и right вместе с useEffect
				<WordPairEditingModal
					modalOpenState={modalOpenState}
					setModalOpenState={setModalOpenState}
					onSubmit={pair => onEdit(id, pair)}
					closeOnSubmit={true}
					leftDefault={left}
					rightDefault={right}
				/>
			)}
		</div>
	)
}