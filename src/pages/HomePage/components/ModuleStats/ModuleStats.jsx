import { useState, useEffect } from 'react'
import './ModuleStats.scss'
import { getAllModulesMeta } from '@/app/helpers/moduleController'
import { getModuleDictinary } from '@/app/helpers/moduleController'
import { getStats } from '@/app/helpers/statsController'

export default function ModuleStats() {
  const [stats, setStats] = useState({
    totalModules: 0,
    totalWordPairs: 0,
    completedModules: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const userStats = await getStats()
        const modulesMeta = await getAllModulesMeta()
        const totalModules = modulesMeta?.length || 0

        // Count total word pairs across all modules
        let totalWordPairs = 0
        let completedModules = userStats.totalSessionsCompleted || 0

        for (const module of modulesMeta || []) {
          try {
            const dictionary = await getModuleDictinary(module.id)
            const pairCount = dictionary?.length || 0
            totalWordPairs += pairCount

          } catch (err) {
            console.error(`Error fetching dictionary for module ${module.id}:`, err)
          }
        }

        setStats({
          totalModules,
          totalWordPairs,
          completedModules,
        })
      } catch (err) {
        console.error('Error fetching module stats:', err)
      }
    }

    fetchStats()
  }, [])

  return (
    <section className='module-stats-section'>
      <h2 className='section-title'>Module Statistics</h2>
      <div className='stats-container'>
        <div className='stat-card'>
          <div className='stat-value modules'>{stats.totalModules}</div>
          <div className='stat-label'>Total Modules</div>
        </div>

        <div className='stat-card'>
          <div className='stat-value pairs'>{stats.totalWordPairs}</div>
          <div className='stat-label'>Word Pairs</div>
        </div>

        <div className='stat-card'>
          <div className='stat-value completed'>{stats.completedModules}</div>
          <div className='stat-label'>Completed</div>
        </div>
      </div>
    </section>
  )
}
