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
          <img src="/mordu-logo.jpg" alt="Mordu de la Pêche" className="logo" onError={(e) => { e.target.src = '/logo.svg'; }} />
          <span>Mordu de la Pêche</span>
        </div>
        <nav className="nav">
          <a className="btn" href="#about">À propos</a>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero">
          <div className="hero-banner">
            <img src="/mordu-banner.png" alt="Mordu de la Pêche" className="banner-image" />
          </div>
          <div className="hero-content-wrapper">
            <div className="hero-text">
              <div className="fishing-icon">🎣</div>
              <h1>Explorez les meilleures aventures de pêche du monde — cartographiées, épinglées, et à un clic.</h1>
              <p>Découvrez où chaque grande prise a été faite ! Zoomez pour voir les marqueurs de vidéos de pêche et cliquez pour regarder.</p>
              <div className="badges">
                <span className="badge">Cliquez sur les spots de pêche pour regarder les vidéos</span>
                <span className="badge">Zoomez pour voir les marqueurs</span>
              </div>
            </div>
            <div className="hero-visual" id="preview-area">
              <FishingMap isPreview={true} onFullscreenClick={handleFullscreenClick} />
            </div>
          </div>
        </section>
        <section className="photos-section" id="about">
          <h2 className="section-title">Aventures de Pêche</h2>
          <p className="section-description">Découvrez les moments forts de nos expéditions de pêche à travers le monde</p>
          <div className="photos-grid">
            <div className="photo-card">
              <img src="/mordu-photo-1.jpg" alt="Aventure de pêche Mordu de la Pêche" className="photo-image" />
              <div className="photo-overlay">
                <span className="photo-label">Expédition Internationale</span>
              </div>
            </div>
            <div className="photo-card">
              <img src="/mordu-photo-2.jpeg" alt="Aventure de pêche Mordu de la Pêche" className="photo-image" />
              <div className="photo-overlay">
                <span className="photo-label">Grandes Prises</span>
              </div>
            </div>
            <div className="photo-card">
              <img src="/mordu-photo-3.jpeg" alt="Aventure de pêche Mordu de la Pêche" className="photo-image" />
              <div className="photo-overlay">
                <span className="photo-label">Aventures Aquatiques</span>
              </div>
            </div>
            <div className="photo-card">
              <img src="/mordu-photo-4.jpeg" alt="Aventure de pêche Mordu de la Pêche" className="photo-image" />
              <div className="photo-overlay">
                <span className="photo-label">Destinations Exotiques</span>
              </div>
            </div>
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
        <span>© {new Date().getFullYear()} Mordu de la Pêche</span>
        <span>Explorez les meilleures aventures de pêche du monde — cartographiées, épinglées, et à un clic.</span>
      </footer>
    </div>
  )
}

export default App

