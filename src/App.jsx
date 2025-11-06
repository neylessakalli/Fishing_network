import React, { useState } from 'react'
import FishingMap from './components/FishingMap'
import './App.css'

function App() {
  const [showFullscreen, setShowFullscreen] = useState(false)

  const handleFullscreenClick = () => {
    setShowFullscreen(true)
  }

  const handleCloseFullscreen = () => {
    setShowFullscreen(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <img src="/logo.svg" alt="Fishing Network" className="logo" />
          <span>Fishing Network</span>
        </div>
        <nav className="nav">
          <a className="btn" href="#about">About</a>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero">
          <div className="hero-text">
            <div className="fishing-icon">🎣</div>
            <h1>Explore the world's best fishing adventures — mapped, pinned, and one click away.</h1>
            <p>Discover where every great catch was made! Zoom in to see fishing video markers and click to watch.</p>
            <div className="badges">
              <span className="badge">Click on fishing spots to watch videos</span>
              <span className="badge">Zoom in to see markers</span>
            </div>
          </div>
          <div className="hero-visual" id="preview-area">
            <FishingMap isPreview={true} onFullscreenClick={handleFullscreenClick} />
          </div>
        </section>
        {showFullscreen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15, 10, 4, 0.96)' }}>
            <button
              onClick={handleCloseFullscreen}
              style={{
                position: 'absolute',
                right: '14px',
                top: '12px',
                zIndex: 1001,
                background: 'rgba(42, 31, 15, 0.95)',
                border: '1px solid rgba(255,200,100,0.3)',
                borderRadius: '10px',
                color: '#ffe8c8',
                cursor: 'pointer',
                padding: '6px 9px',
                fontSize: '18px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(139, 90, 43, 0.95)'
                e.target.style.borderColor = 'rgba(255,200,100,0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(42, 31, 15, 0.95)'
                e.target.style.borderColor = 'rgba(255,200,100,0.3)'
              }}
            >
              ✕
            </button>
            <FishingMap isPreview={false} />
          </div>
        )}
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Fishing Network</span>
        <span>Explore the world's best fishing adventures — mapped, pinned, and one click away.</span>
      </footer>
    </div>
  )
}

export default App

