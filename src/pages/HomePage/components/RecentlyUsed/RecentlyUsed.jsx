import { useNavigate } from 'react-router-dom'
import './RecentlyUsed.scss'
import IconBtn from '@/ui/IconBtn/IconBtn'
import PenSquareIcon from '@/app/icons/pen-square.svg?react'
import TestIcon from '@/app/icons/test.svg?react'
import paths from '@/app/consts/paths'
import { useEffect, useState } from 'react'
import { getStats } from '@/app/helpers/statsController'
import { getModuleMeta } from '@/app/helpers/moduleController'

export default function RecentlyUsed() {
  const navigate = useNavigate()
  const [modules, setModules] = useState([])

  useEffect(() => {
    getStats()
      .then(stats => Promise.all(stats.recentlyUsedModuleIds.map(moduleId => getModuleMeta(moduleId))))
      .then(recentModules => setModules(recentModules))
  }, [])

  return (
    <section className='recently-used-section'>
      <h2 className='section-title'>Recently Used Modules</h2>
      <div className='modules-list'>
        {modules.map((module) => (
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
    </section>
  )
}
