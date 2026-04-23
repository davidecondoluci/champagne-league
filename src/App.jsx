import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Dettagli from "./pages/Dettagli";
import Premi from "./pages/Premi";
import Pacchetti from "./pages/Pacchetti";
import Partner from "./pages/Partner";
import Gallery from "./pages/Gallery";
import Storico from "./pages/Storico";
import Divise from "./pages/Divise";
import Iscriviti from "./pages/Iscriviti";
import Contatti from "./pages/Contatti";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Storico />
      <Dettagli />
      <Premi />
      <Pacchetti />
      <Partner />
      <Gallery />
      <Divise />
      <Iscriviti />
      <Contatti />
    </>
  );
}

export default App;
