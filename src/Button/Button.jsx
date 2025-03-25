import './Button.scss'

export default function Button({ children, className = '', isActive = false, isTransparent = false, ...props }) {
	let btnClasses = className + ' '
	btnClasses += isTransparent ? 'btn-transparent' : 'btn'
	if (isActive) btnClasses += ' active'

	return (
		<button
			className={btnClasses}
			{...props}
		>
			{children}
		</button >
	)
}