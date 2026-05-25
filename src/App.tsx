import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import NotFound from "./errors/NotFound.tsx";
import { CloseButton } from "./components/CloseButton";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CloseButton />
      <main>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
