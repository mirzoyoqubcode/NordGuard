import "./App.css";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
