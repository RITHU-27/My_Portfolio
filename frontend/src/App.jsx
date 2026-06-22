import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import SplashScreen from "./components/SplashScreen.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);

  // You can also use this to pre-fetch any critical data if needed
  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <SplashScreen onComplete={handleLoadingComplete} />
      {!loading && (
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/messages" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      )}
    </>
  );
}
