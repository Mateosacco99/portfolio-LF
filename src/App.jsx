import { useContext } from "react"
import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection"
import Biografia from "./components/Biografia"
import Proyectos from "./components/Proyectos"
import GlobalMusicPlayer from "./components/GlobalMusicPlayer"
import { MusicProvider, MusicContext } from "./context/MusicContext"
import Contacto from "./components/Contacto"
import ErrorBoundary from "./components/ErrorBoundary"

const AppContent = () => {
  const { currentTrack, playlist } = useContext(MusicContext)
  const playerActive = currentTrack && playlist.length > 0

  return (
    <div className={`app-content ${playerActive ? 'player-active' : ''}`}>
      <NavBar />
      <HeroSection />
      <Biografia />
      <Proyectos />
      <Contacto />
    </div>
  )
}

const App = () => {
  return (
    <ErrorBoundary>
      <MusicProvider>
        <AppContent />
        <GlobalMusicPlayer />
      </MusicProvider>
    </ErrorBoundary>
  )
}

export default App
