import './Input.scss'

export default ({ className = '', disabled = false, isWrong = false, isCorrect = false, ...props }) => {
	let classes = className + ' input'
	if (isWrong) classes += ' error'
	else if (isCorrect) classes += ' success'
	return (
		<input className={classes} disabled={disabled} {...props} type="text" />
	)
}