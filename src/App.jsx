import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Price from "./Pages/Price";
import Footer from "./components/Footer";
import Explore from "./Pages/Explore";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/price" element={<Price />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
