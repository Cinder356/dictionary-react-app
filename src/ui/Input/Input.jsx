import './Input.scss'

export default ({ className = '', disabled = false, isWrong = false, ...props }) => {
	let classes = className + ' input'
	if (isWrong) classes += ' error'
	return (
		<input className={classes} disabled={disabled} {...props} type="text" />
	)
}