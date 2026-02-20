import { useNavigate } from 'react-router-dom'
import './RecentlyUsed.scss'
import IconBtn from '@/ui/IconBtn/IconBtn'
import PenSquareIcon from '@/app/icons/pen-square.svg?react'
import TestIcon from '@/app/icons/test.svg?react'
import paths from '@/app/consts/paths'

/**
 * UI Placeholder for Recently Used Modules
 * TODO: Implement data fetching when tracking is ready
 */
export default function RecentlyUsed() {
  const navigate = useNavigate()

  // Placeholder data - replace with actual data when implementing tracking
  const placeholderModules = [
    { id: 1, title: 'Business English Vocabulary' },
    { id: 2, title: 'Common Phrasal Verbs' },
    { id: 3, title: 'IELTS Essential Words' },
  ]

  return (
    <section className='recently-used-section'>
      <h2 className='section-title'>Recently Used Modules</h2>
      <div className='modules-list'>
        {placeholderModules.map((module) => (
          <div key={module.id} className='module-row'>
            <span className='module-title' translate='no'>{module.title}</span>
            <div className='module-actions'>
              <IconBtn
                onClick={() => navigate(paths.getEditing(module.id))}
                aria-label='Edit module'
              >
                <PenSquareIcon className='secondary-icon' />
              </IconBtn>
              <IconBtn
                onClick={() => navigate(paths.getLearn(module.id))}
                aria-label='Start learning'
              >
                <TestIcon className='secondary-icon' />
              </IconBtn>
            </div>
          </div>
        ))}
      </div>
      <p className='placeholder-note'>
        {/* TODO: Remove when implementing real data */}
        Tracking coming soon...
      </p>
    </section>
  )
}
