import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import Footer from "./Components/Footer";
import OurWorks from "./OurWorks"; // Assuming you have this component
import { LoadingPage, ContactUs } from "./LoadingContactPages";
import Header from "./Components/Header"; // Assuming you have a Header component

const App = () => {
  const location = useLocation();

  // Check if the current route is the loading page
  const isLoadingPage = location.pathname === "/loading";

  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Ensure the header is always included */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-works" element={<OurWorks />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/loading" element={<LoadingPage />} />
        {/* Add other routes here */}
      </Routes>
      {!isLoadingPage && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;