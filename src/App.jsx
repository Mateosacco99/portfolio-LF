import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection"
import Biografia from "./components/Biografia"
import Proyectos from "./components/Proyectos"
import GlobalMusicPlayer from "./components/GlobalMusicPlayer"
import { MusicProvider } from "./context/MusicContext"

const App = () => {
  return (
    <MusicProvider>
      <div>
        <NavBar />
        <HeroSection />
        <Biografia />
        <Proyectos />
        <GlobalMusicPlayer />
      </div>
    </MusicProvider>
  )
}

export default App
