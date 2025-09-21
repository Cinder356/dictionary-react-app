import './TestAnswer.scss'


export default function ({ isCorrect = false, isWrong = false, definition, onClick }) {
	let additionalClass = ''
	if (isCorrect)
		additionalClass = 'correct'
	else if (isWrong)
		additionalClass = 'wrong'

	return (
		<div className={`test-answer ${additionalClass}`} onClick={onClick}>
			<p translate='no'>{definition}</p>
		</div>
	)
}