import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import NotFound from "./errors/NotFound.tsx";
import { CloseButton } from "./components/CloseButton";
import "./App.css";
import { SoundProvider } from "./contexts/SoundContext";
import SoundControls from "./components/SoundControls";

function App() {
  return (
    <SoundProvider>
      <SoundControls />
      <BrowserRouter>
        <CloseButton />
        <main>
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </SoundProvider>
  );
}

export default App;
