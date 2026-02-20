import { useNavigate } from 'react-router-dom'
import './QuickActions.scss'
import PlusIcon from '@/app/icons/plus.svg?react'
import CardsIcon from '@/app/icons/cards.svg?react'
import TestIcon from '@/app/icons/test.svg?react'
import paths from '@/app/consts/paths'

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <section className='quick-actions-section'>
      <h2 className='section-title'>Quick Actions</h2>
      <div className='actions-container'>
        <div
          className='action-card'
          onClick={() => navigate(paths.getEditing(-1))}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(paths.getEditing(-1))}
        >
          <div className='action-icon-container create'>
            <PlusIcon className='action-icon' />
          </div>
          <h3 className='action-label'>Create New Module</h3>
        </div>

        <div
          className='action-card'
          onClick={() => navigate(paths.getView())}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(paths.getView())}
        >
          <div className='action-icon-container view'>
            <CardsIcon className='action-icon' />
          </div>
          <h3 className='action-label'>View All Modules</h3>
        </div>

        <div
          className='action-card'
          onClick={() => navigate(paths.getLearn(-1))}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(paths.getLearn(-1))}
        >
          <div className='action-icon-container learn'>
            <TestIcon className='action-icon' />
          </div>
          <h3 className='action-label'>Continue Learning</h3>
        </div>
      </div>
    </section>
  )
}
