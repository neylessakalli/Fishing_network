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
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/mordu-logo.jpg" 
              alt="Mordu de la Pêche" 
              className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shadow-soft"
              onError={(e) => { e.target.src = '/logo.svg'; }} 
            />
            <span className="font-display font-bold text-xl text-neutral-900">Mordu de la Pêche</span>
          </div>
          <nav>
            <a 
              href="#about" 
              className="px-4 py-2 rounded-lg border-2 border-primary-600 text-primary-700 font-semibold hover:bg-primary-50 hover:border-primary-700 transition-all duration-200"
            >
              À propos
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Banner with Gradient Overlay */}
        <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          <img 
            src="/mordu-banner.png" 
            alt="Mordu de la Pêche" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-800/40 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-4xl">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-balance drop-shadow-lg">
                Explorez les meilleures aventures de pêche du monde
              </h1>
              <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
                Cartographiées, épinglées, et à un clic
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Content */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="text-5xl mb-4">🎣</div>
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                  Découvrez où chaque grande prise a été faite
                </h2>
                <p className="text-neutral-600 mb-6 text-lg leading-relaxed">
                  Zoomez pour voir les marqueurs de vidéos de pêche et cliquez pour regarder. 
                  Explorez les aventures de pêche à travers le monde entier.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg border border-primary-200 font-medium text-sm">
                    Cliquez sur les spots de pêche
                  </span>
                  <span className="px-4 py-2 bg-accent-50 text-accent-700 rounded-lg border border-accent-200 font-medium text-sm">
                    Zoomez pour voir les marqueurs
                  </span>
                </div>
              </div>
              <div 
                className="relative h-[500px] rounded-xl overflow-hidden shadow-strong border border-neutral-200 cursor-pointer group"
                id="preview-area"
                onClick={handleFullscreenClick}
              >
                <FishingMap isPreview={true} onFullscreenClick={handleFullscreenClick} />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 text-center text-sm text-neutral-600 font-medium shadow-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Cliquez pour ouvrir la carte en plein écran
                </div>
              </div>
            </div>
          </section>

          {/* Photos Section */}
          <section className="py-16" id="about">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                Aventures de Pêche
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Découvrez les moments forts de nos expéditions de pêche à travers le monde
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { src: '/mordu-photo-1.jpg', label: 'Expédition Internationale' },
                { src: '/mordu-photo-2.jpeg', label: 'Grandes Prises' },
                { src: '/mordu-photo-3.jpeg', label: 'Aventures Aquatiques' },
                { src: '/mordu-photo-4.jpeg', label: 'Destinations Exotiques' },
              ].map((photo, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white font-semibold text-lg drop-shadow-lg">
                      {photo.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Fullscreen Map Modal */}
        {showFullscreen && (
          <div className="fixed inset-0 z-[1000] bg-neutral-900/95 backdrop-blur-sm">
            <button
              onClick={handleCloseFullscreen}
              className="absolute right-4 top-4 z-[1001] bg-white hover:bg-neutral-100 border-2 border-neutral-300 hover:border-primary-500 rounded-lg text-neutral-700 hover:text-primary-700 cursor-pointer p-2.5 text-xl font-bold transition-all duration-200 shadow-medium hover:shadow-strong"
            >
              ✕
            </button>
            <FishingMap isPreview={false} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-neutral-600 font-medium">
              © {new Date().getFullYear()} Mordu de la Pêche
            </span>
            <span className="text-neutral-500 text-sm italic text-center md:text-right">
              Explorez les meilleures aventures de pêche du monde — cartographiées, épinglées, et à un clic.
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
