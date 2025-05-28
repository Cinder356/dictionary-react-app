import './Button.scss'
import btnColors from '@/app/consts/btnColors'

export default function Button({ children, className = '', color = btnColors.ACTIVE, isTransparent = false, disabled = false, ...props }) {
	let additionalClasses = (isTransparent ? 'btn-transparent' : `btn`) + ' ' + color

	return (
		<button
			disabled={disabled}
			className={additionalClasses + ' ' + className}
			type='button'
			{...props}
		>
			{children}
		</button >
	)
}