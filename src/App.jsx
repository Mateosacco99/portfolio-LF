import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection"
import Biografia from "./components/Biografia"
import Proyectos from "./components/Proyectos"
import GlobalMusicPlayer from "./components/GlobalMusicPlayer"
import { MusicProvider } from "./context/MusicContext"
import Contacto from "./components/Contacto"
import ErrorBoundary from "./components/ErrorBoundary"

const App = () => {
  return (
    <ErrorBoundary>
      <MusicProvider>
        <div>
          <NavBar />
          <HeroSection />
          <Biografia />
          <Proyectos />
          <Contacto />
          <GlobalMusicPlayer />
        </div>
      </MusicProvider>
    </ErrorBoundary>
  )
}

export default App
