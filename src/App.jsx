import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Movies from "./Movies";
import TVShows from "./TVShows";

function App() {
  const [sData, setData] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  /*default fetch */
  function fetchAllData() {
    Promise.all([
      fetch(
        "https://api.themoviedb.org/3/trending/all/week?page=1&api_key=7fb2198dd66a3bd9c3257d003f070a5e"
      ).then((res) => res.json()),
      fetch(
        "https://api.themoviedb.org/3/trending/all/week?page=2&api_key=7fb2198dd66a3bd9c3257d003f070a5e"
      ).then((res) => res.json()),
    ])
      .then(([page1, page2]) => {
        console.log("Page 1 data:", page1);
        console.log("Page 2 data:", page2);

        if (!page1?.results || !page2?.results) {
          console.error("One of the API responses is invalid:", page1, page2);
          return;
        }

        const combined = [...page1.results, ...page2.results];
        console.log("Combined trending:", combined);
        setData(combined);
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  return (
    <Routes>
      <Route path="/" element={<Home trendingAll={sData} />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TVShows />} />
    </Routes>
  );
}

export default App;
