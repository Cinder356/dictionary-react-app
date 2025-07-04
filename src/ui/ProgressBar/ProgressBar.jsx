import './ProgressBar.scss'


export default function ({ progress, ...props }) {
	return (
		<div className='content-wrapper progress-bar' {...props}>
			<div className="progress" style={{ width: progress + '%' }} />
		</div>
	)
}