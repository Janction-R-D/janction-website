import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Explore from "./Pages/Explore";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
