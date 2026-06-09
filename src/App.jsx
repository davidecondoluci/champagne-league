import Hero from "./pages/Hero";
import Dettagli from "./pages/Dettagli";
import Premi from "./pages/Premi";
import Pacchetti from "./pages/Pacchetti";
import Giornata from "./pages/Giornata";
import Partner from "./pages/Partner";
import Gallery from "./pages/Gallery";
import Storia from "./pages/Storia";
import Divise from "./pages/Divise";
import Iscriviti from "./pages/Iscriviti";
import Contatti from "./pages/Contatti";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Hero />
      <Dettagli />
      <Premi />
      <Pacchetti />
      <Partner />
      <Giornata />
      <Iscriviti />
      <Storia />
      <Gallery />
      <Divise />
      <Contatti />
      <Analytics />
    </>
  );
}

export default App;
