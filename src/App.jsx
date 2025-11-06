import React, { useState } from 'react'
import FishingMap from './components/FishingMap'
import './App.css'

// Import fishing spots data for stats
const FISHING_SPOTS_COUNT = 100 // Approximate count - will be dynamic
const DESTINATIONS_COUNT = 50 // Approximate count

function App() {
  const [showFullscreen, setShowFullscreen] = useState(false)

  const handleFullscreenClick = () => {
    setShowFullscreen(true)
  }

  const handleCloseFullscreen = () => {
    setShowFullscreen(false)
  }

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Premium Header */}
      <header className="bg-dark-900/80 backdrop-blur-xl border-b border-dark-800 sticky top-0 z-50 shadow-strong">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="/mordu-logo.jpg" 
                alt="Mordu de la Pêche" 
                className="w-12 h-12 rounded-xl object-cover border-2 border-primary-500/30 shadow-glow"
                onError={(e) => { e.target.src = '/logo.svg'; }} 
              />
              <div className="absolute -inset-1 bg-primary-500/20 rounded-xl blur-sm"></div>
            </div>
            <div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">Mordu de la Pêche</span>
              <p className="text-xs text-dark-400 font-medium">Aventures de pêche mondiales</p>
            </div>
          </div>
          <nav>
            <a 
              href="#about" 
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-500 hover:to-primary-600 shadow-medium hover:shadow-glow transition-all duration-300"
            >
              À propos
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Cinematic Hero Banner */}
        <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/mordu-banner.png" 
              alt="Mordu de la Pêche" 
              className="w-full h-full object-cover scale-105"
              style={{ filter: 'brightness(0.7) contrast(1.1)' }}
            />
          </div>
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/90 via-dark-950/60 to-dark-950/95"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-transparent to-accent-900/30"></div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-6 max-w-5xl">
              <div className="inline-block mb-6">
                <span className="text-6xl">🎣</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight tracking-tight">
                <span className="block">Explorez les meilleures</span>
                <span className="block gradient-text">aventures de pêche</span>
                <span className="block">du monde</span>
              </h1>
              <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Cartographiées, épinglées, et à un clic — découvrez où chaque grande prise a été faite
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-xl text-dark-200 font-medium">
                  🌍 50+ destinations
                </div>
                <div className="px-6 py-3 bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-xl text-dark-200 font-medium">
                  ▶️ 100+ vidéos
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          {/* Map Section */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-5xl">🗺️</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                  Carte interactive
                  <span className="block text-primary-400">des aventures</span>
                </h2>
                <p className="text-lg text-dark-300 leading-relaxed max-w-lg">
                  Zoomez pour découvrir les marqueurs de vidéos de pêche à travers le monde. 
                  Chaque point représente une aventure unique, filmée dans les plus beaux spots de pêche de la planète.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <div className="px-5 py-3 bg-dark-800 border border-dark-700 rounded-xl">
                    <div className="text-sm text-dark-400 mb-1">Comment utiliser</div>
                    <div className="text-white font-semibold">Zoomez et cliquez</div>
                  </div>
                  <div className="px-5 py-3 bg-dark-800 border border-dark-700 rounded-xl">
                    <div className="text-sm text-dark-400 mb-1">Vidéos disponibles</div>
                    <div className="text-white font-semibold">100+ épisodes</div>
                  </div>
                </div>
              </div>
              <div 
                className="relative h-[600px] rounded-2xl overflow-hidden shadow-premium border border-dark-800 cursor-pointer group"
                id="preview-area"
                onClick={handleFullscreenClick}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-accent-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <FishingMap isPreview={true} onFullscreenClick={handleFullscreenClick} />
                <div className="absolute bottom-6 left-6 right-6 bg-dark-900/95 backdrop-blur-xl rounded-xl px-6 py-4 text-center border border-dark-800 shadow-strong opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="text-white font-semibold text-base">Cliquez pour ouvrir la carte en plein écran</div>
                  <div className="text-dark-400 text-sm mt-1">Explorez toutes les destinations</div>
                </div>
              </div>
            </div>
          </section>

          {/* Premium Photos Gallery */}
          <section className="py-20" id="about">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="text-4xl">📸</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
                Aventures de Pêche
              </h2>
              <p className="text-xl text-dark-300 max-w-2xl mx-auto leading-relaxed">
                Découvrez les moments forts de nos expéditions de pêche à travers le monde
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { src: '/mordu-photo-1.jpg', label: 'Expédition Internationale', icon: '🌍' },
                { src: '/mordu-photo-2.jpeg', label: 'Grandes Prises', icon: '🐟' },
                { src: '/mordu-photo-3.jpeg', label: 'Aventures Aquatiques', icon: '🌊' },
                { src: '/mordu-photo-4.jpeg', label: 'Destinations Exotiques', icon: '🏝️' },
              ].map((photo, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-strong hover:shadow-premium transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                >
                  <div className="absolute inset-0">
                    <img
                      src={photo.src}
                      alt={photo.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                      style={{ filter: 'brightness(0.85) contrast(1.1)' }}
                    />
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-3xl mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {photo.icon}
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">
                        {photo.label}
                      </h3>
                      <div className="h-1 w-0 group-hover:w-12 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Fullscreen Map Modal */}
        {showFullscreen && (
          <div className="fixed inset-0 z-[1000] bg-dark-950/98 backdrop-blur-xl">
            <button
              onClick={handleCloseFullscreen}
              className="absolute right-6 top-6 z-[1001] w-12 h-12 bg-dark-800 hover:bg-dark-700 border-2 border-dark-700 hover:border-primary-500 rounded-xl text-white hover:text-primary-400 cursor-pointer flex items-center justify-center text-2xl font-bold transition-all duration-300 shadow-strong hover:shadow-glow group"
            >
              <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
            </button>
            <FishingMap isPreview={false} />
          </div>
        )}
      </main>

      {/* Premium Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 mt-auto">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/mordu-logo.jpg" 
                  alt="Mordu de la Pêche" 
                  className="w-10 h-10 rounded-lg object-cover border border-dark-700"
                  onError={(e) => { e.target.src = '/logo.svg'; }} 
                />
                <span className="font-display font-bold text-lg text-white">Mordu de la Pêche</span>
              </div>
              <p className="text-dark-400 text-sm leading-relaxed">
                Explorez les meilleures aventures de pêche du monde — cartographiées, épinglées, et à un clic.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Statistiques</h4>
              <div className="space-y-2 text-sm">
                <div className="text-dark-300">100+ vidéos disponibles</div>
                <div className="text-dark-300">50+ destinations</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-dark-400 hover:text-primary-400 transition-colors text-sm">À propos</a>
                <a href="#" className="block text-dark-400 hover:text-primary-400 transition-colors text-sm">Carte interactive</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-dark-500 text-sm">
              © {new Date().getFullYear()} Mordu de la Pêche. Tous droits réservés.
            </span>
            <div className="flex gap-6 text-dark-500 text-sm">
              <span>Made with 🎣</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
