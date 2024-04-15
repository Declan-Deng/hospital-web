import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./Views/LoginPage";
import HomePage from "./Views/HomePage";
import InfoSearch from "./Views/InfoSearch";
import RealtimeDetect from "./Views/RealtimeDetect";
import FamilyContact from "./Views/FamilyContact";
import ElderlyDetail from "./Views/ElderlyDetail";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Separate route structure for the login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DefaultContainer />} />
        </Routes>
      </div>
    </Router>
  );
};

const DefaultContainer = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/query" element={<InfoSearch />} />
          <Route path="/monitor" element={<RealtimeDetect />} />
          <Route path="/contact" element={<FamilyContact />} />
          <Route path="/elderly/:id" element={<ElderlyDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
