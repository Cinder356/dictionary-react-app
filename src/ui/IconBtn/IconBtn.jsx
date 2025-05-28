import './IconBtn.scss'
import btnColors from '@/app/consts/btnColors'

export default function ({ children, className = '', disabled = false, ...props }) {
	return (
		<button
			disabled={disabled}
			className={'icon-btn ' + className}
			{...props}
		>
			{children}
		</button>
	)
}