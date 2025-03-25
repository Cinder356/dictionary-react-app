import classes from './Button.module.scss'

export default function Button({ children, className = '', isActive = false, ...props }) {
	return (
		<button
			className={`${className} ${isActive ? `${classes.button} ${classes.active}` : classes.button}`}
			{...props}
		>
			{children}
		</button >
	)
}