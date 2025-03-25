import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import DigitRecognition from "./pages/DigitRecognition";
import DigitTraining from "./pages/DigitTraining";
import TicTacToe from "./pages/TicTacToe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="digit-recognition" element={<DigitRecognition />} />
        <Route path="digit-recognition/training" element={<DigitTraining />} />
        <Route path="tic-tac-toe" element={<TicTacToe />} />
      </Route>
    </Routes>
  );
}

export default App;
