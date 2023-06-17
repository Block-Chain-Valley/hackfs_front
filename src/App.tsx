import { useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Upload from "./pages/Upload";
import Home from "./pages/Home";

function App() {
  const handleClickNavLink = (index: any) => {
    console.log(index);
    sectionRefs[index].current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "start",
    });
  };
  const sectionRefs = [
    useRef(null), // 섹션 1에 대한 참조
    useRef(null), // 섹션 2에 대한 참조
    useRef(null), // 섹션 3에 대한 참조
    useRef(null),
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header handleClickNavLink={handleClickNavLink} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
