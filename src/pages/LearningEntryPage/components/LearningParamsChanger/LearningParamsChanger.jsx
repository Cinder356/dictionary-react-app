import './LearningParamsChanger.scss'
import Toggle from '@/ui/Toggle/Toggle'
import modes from '../../consts/modes'

export default function ({ learningParamsRef, currentModeIndex, className = '' }) {
	return (
		<div className={'learning-toggle-container' + ' ' + className}>
			{modes[currentModeIndex].requiredParams.includes('isReverse') &&
				<>
					<p>Reverse:</p>
					<Toggle onChange={(val) => learningParamsRef.current.isReverse = val} />
				</>}
		</div>
	)
}