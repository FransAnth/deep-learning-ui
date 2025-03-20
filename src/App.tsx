import "./App.css";
import { Routes, Route } from "react-router-dom";
import DigitCanvas from "./pages/DigitCanvas";

function App() {
  return (
    <Routes>
      <Route path="" element={<DigitCanvas />} />
    </Routes>
  );
}

export default App;
