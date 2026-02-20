import { useNavigate } from 'react-router-dom';
import paths from '@/app/consts/paths'
import Modal from '@/ui/Modal/Modal'
import Button from '@/ui/Button/Button'
import btnColors from '@/app/consts/btnColors'
import './ProgressModal.scss'

export default function ({ isOpen, fails, succeses, onRestart }) {
  const navigate = useNavigate()

  return (
    <Modal className='progress-modal' isOpen={isOpen}>
      <h2><b>Progress:</b></h2>
      <h1 className='progress-stats'>{succeses} / {fails + succeses}</h1>
      <div className='button-container'>
        <Button onClick={() => navigate(paths.getLearn(-1))} color={btnColors.RED}>Exit</Button>
        <Button onClick={onRestart}>Restart</Button>
      </div>
    </Modal>
  )
}
