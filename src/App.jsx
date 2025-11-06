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
    <div className="min-h-screen bg-brown-950 flex flex-col">
      {/* Professional Header */}
      <header className="bg-brown-950/95 backdrop-blur-sm border-b border-earth-800/30 sticky top-0 z-50 shadow-strong">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="/mordu-logo.jpg" 
              alt="Mordu de la Pêche" 
              className="w-12 h-12 rounded-lg object-cover border-2 border-earth-500/40 shadow-glow"
              onError={(e) => { e.target.src = '/logo.svg'; }} 
            />
            <div>
              <span className="font-display font-bold text-2xl text-earth-400 tracking-tight">Mordu de la Pêche</span>
              <p className="text-xs text-earth-600 font-medium">Aventures de pêche mondiales</p>
            </div>
          </div>
          <nav>
            <a 
              href="#about" 
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-earth-500 to-earth-600 text-brown-950 font-bold hover:from-earth-400 hover:to-earth-500 shadow-medium hover:shadow-glow transition-all duration-300"
            >
              À propos
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Banner - Let it show through */}
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
          <img 
            src="/mordu-banner.png" 
            alt="Mordu de la Pêche" 
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay - don't hide the banner */}
          <div className="absolute inset-0 bg-gradient-to-b from-brown-950/40 via-transparent to-brown-950/60"></div>
          
          {/* Content positioned to not cover banner text */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-lg md:text-xl text-earth-200 mb-4 font-medium drop-shadow-lg">
                Cartographiées, épinglées, et à un clic
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-5 py-2.5 bg-brown-900/80 backdrop-blur-sm border border-earth-700/40 rounded-lg text-earth-200 font-semibold text-sm">
                  🌍 50+ destinations
                </div>
                <div className="px-5 py-2.5 bg-brown-900/80 backdrop-blur-sm border border-earth-700/40 rounded-lg text-earth-200 font-semibold text-sm">
                  ▶️ 100+ vidéos
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Map Section */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-5xl">🗺️</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-earth-400 leading-tight">
                  Carte interactive
                  <span className="block text-earth-300">des aventures</span>
                </h2>
                <p className="text-lg text-earth-200 leading-relaxed max-w-lg">
                  Zoomez pour découvrir les marqueurs de vidéos de pêche à travers le monde. 
                  Chaque point représente une aventure unique, filmée dans les plus beaux spots de pêche de la planète.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="px-5 py-3 bg-brown-900/60 border border-earth-800/40 rounded-xl">
                    <div className="text-sm text-earth-500 mb-1">Comment utiliser</div>
                    <div className="text-earth-300 font-semibold">Zoomez et cliquez</div>
                  </div>
                  <div className="px-5 py-3 bg-brown-900/60 border border-earth-800/40 rounded-xl">
                    <div className="text-sm text-earth-500 mb-1">Vidéos disponibles</div>
                    <div className="text-earth-300 font-semibold">100+ épisodes</div>
                  </div>
                </div>
              </div>
              <div 
                className="relative h-[550px] rounded-2xl overflow-hidden shadow-strong border-2 border-earth-800/40 cursor-pointer group"
                id="preview-area"
                onClick={handleFullscreenClick}
              >
                <FishingMap isPreview={true} onFullscreenClick={handleFullscreenClick} />
                <div className="absolute bottom-6 left-6 right-6 bg-brown-900/95 backdrop-blur-xl rounded-xl px-6 py-4 text-center border border-earth-800/40 shadow-strong opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="text-earth-300 font-semibold text-base">Cliquez pour ouvrir la carte en plein écran</div>
                  <div className="text-earth-500 text-sm mt-1">Explorez toutes les destinations</div>
                </div>
              </div>
            </div>
          </section>

          {/* Photos Gallery */}
          <section className="py-16" id="about">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="text-4xl">📸</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-earth-400 mb-5">
                Aventures de Pêche
              </h2>
              <p className="text-xl text-earth-200 max-w-2xl mx-auto leading-relaxed">
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
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-strong hover:shadow-glow transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 border-earth-800/30"
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay - subtle */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-950/90 via-brown-950/30 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-2xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {photo.icon}
                      </div>
                      <h3 className="text-earth-300 font-bold text-lg mb-2 drop-shadow-lg">
                        {photo.label}
                      </h3>
                      <div className="h-0.5 w-0 group-hover:w-12 bg-gradient-to-r from-earth-500 to-earth-400 transition-all duration-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Fullscreen Map Modal */}
        {showFullscreen && (
          <div className="fixed inset-0 z-[1000] bg-brown-950/98 backdrop-blur-sm">
            <button
              onClick={handleCloseFullscreen}
              className="absolute right-6 top-6 z-[1001] w-12 h-12 bg-brown-900 hover:bg-brown-800 border-2 border-earth-800/40 hover:border-earth-500 rounded-xl text-earth-300 hover:text-earth-400 cursor-pointer flex items-center justify-center text-2xl font-bold transition-all duration-300 shadow-strong hover:shadow-glow group"
            >
              <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
            </button>
            <FishingMap isPreview={false} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-brown-950 border-t border-earth-800/30 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/mordu-logo.jpg" 
                  alt="Mordu de la Pêche" 
                  className="w-10 h-10 rounded-lg object-cover border border-earth-800/40"
                  onError={(e) => { e.target.src = '/logo.svg'; }} 
                />
                <span className="font-display font-bold text-lg text-earth-400">Mordu de la Pêche</span>
              </div>
              <p className="text-earth-500 text-sm leading-relaxed">
                Explorez les meilleures aventures de pêche du monde — cartographiées, épinglées, et à un clic.
              </p>
            </div>
            <div>
              <h4 className="text-earth-300 font-semibold mb-4">Statistiques</h4>
              <div className="space-y-2 text-sm">
                <div className="text-earth-400">100+ vidéos disponibles</div>
                <div className="text-earth-400">50+ destinations</div>
              </div>
            </div>
            <div>
              <h4 className="text-earth-300 font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-earth-500 hover:text-earth-400 transition-colors text-sm">À propos</a>
                <a href="#" className="block text-earth-500 hover:text-earth-400 transition-colors text-sm">Carte interactive</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-earth-800/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-earth-600 text-sm">
              © {new Date().getFullYear()} Mordu de la Pêche. Tous droits réservés.
            </span>
            <div className="flex gap-6 text-earth-600 text-sm">
              <span>Made with 🎣</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
