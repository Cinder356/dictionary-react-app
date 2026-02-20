import './HomePage.scss'
import WelcomeSection from './WelcomeSection/WelcomeSection'
import QuickActions from './QuickActions/QuickActions'
import RecentlyUsed from './RecentlyUsed/RecentlyUsed'
import ModuleStats from './ModuleStats/ModuleStats'

export default function HomePage() {
  return (
    <div className='content-wrapper home-page'>
      <WelcomeSection />
      <QuickActions />
      <RecentlyUsed />
      <ModuleStats />
    </div>
  )
}
