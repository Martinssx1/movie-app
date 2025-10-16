import React from "react";

import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Movies from "./Movies";
import TVShows from "./TVShows";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TVShows />} />
    </Routes>
  );
}

export default App;
