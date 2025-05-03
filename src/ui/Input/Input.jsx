import './Input.scss'

export default ({ className = '', isWrong = false, ...props }) => {
	let classes = className + ' input'
	if (isWrong) classes += ' error'
	return (
		<input className={classes} {...props} type="text" />
	)
}