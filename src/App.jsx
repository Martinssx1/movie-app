import React from "react";

import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Movies from "./Movies";
import TVShows from "./TVShows";
import Details from "./Details";
import Search from "./Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TVShows />} />
      <Route
        path="/details/movie/:id"
        element={<Details mediaType="movie" />}
      />
      <Route path="/details/tv/:id" element={<Details mediaType="tv" />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
