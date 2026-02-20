import './WelcomeSection.scss'

export default function WelcomeSection() {
  return (
    <div className='welcome-wrapper'>
      <section className='welcome-section'>
        <h1 className='welcome-title'>Welcome to LTerm</h1>
        <p className='welcome-message'>
          Your personal space for mastering vocabulary. Create modules, track progress, and achieve your language goals.
        </p>
      </section>
    </div>
  )
}
