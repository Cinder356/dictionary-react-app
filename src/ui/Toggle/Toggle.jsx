import './Toggle.scss'

export default function ({ onChange, ...props }) {
	return (
		<label className="toggle" {...props}>
			<input onChange={(e) => onChange(e.target.checked)} type="checkbox" className="toggle-input" />
			<span className="toggle-slider" />
		</label>
	)
}