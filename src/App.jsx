import { useState } from 'react'
import APOD from './pages/APOD'
import StarMap from './pages/StarMap'
import Layout from './components/Layout'
import './components/Layout.css'

function App() {
  const [view, setView] = useState('apod')

  return (
    <Layout>
      {/* Navigation Buttons */}
      <nav className="nav-buttons">
        <button
          className={view === 'apod' ? 'active' : ''}
          onClick={() => setView('apod')}
        >
          NASA Photo
        </button>
        <button
          className={view === 'starmap' ? 'active' : ''}
          onClick={() => setView('starmap')}
        >
          Star Map
        </button>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {view === 'apod' && <APOD />}
        {view === 'starmap' && <StarMap />}
      </div>
    </Layout>
  )
}

export default App
