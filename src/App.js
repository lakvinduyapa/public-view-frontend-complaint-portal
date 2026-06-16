import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ComplaintForm from "./pages/ComplaintForm";
import Confirmation from "./pages/Confirmation";
import Success from "./pages/Success";
import TrackComplaint from "./pages/TrackComplaint"; // make sure this component exists

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<ComplaintForm />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/success/:crn" element={<Success />} />
      <Route path="/track" element={<TrackComplaint />} />
    </Routes>
  );
}

export default App;