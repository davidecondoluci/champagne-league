import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dettagli from "./components/Dettagli";
import Programma from "./components/Programma";
import Premi from "./components/Premi";
import Partner from "./components/Partner";
import Gallery from "./components/Gallery";
import Divise from "./components/Divise";
import Iscriviti from "./components/Iscriviti";
import Contatti from "./components/Contatti";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Programma />
      <Dettagli />
      <Premi />
      <Partner />
      <Gallery />
      <Divise />
      <Iscriviti />
      <Contatti />
    </>
  );
}

export default App;
