import { useEffect, useState } from "react";

import Home from "./Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Movies from "./Movies";
import TVShows from "./TVShows";
import Details from "./Details";
import Search from "./Search";
import Favorite from "./favourite/Favorite";
import Mainlayout from "./Routes/Mainlayout";
import Detailsandsearchlayout from "./Routes/Detailsandsearchlayout";

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  function handleMenuOnClick() {
    if (mobileMenu) {
      setMobileMenu(false);
    } else {
      setMobileMenu(true);
    }
  }
  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route element={<Mainlayout handleMenuOnClick={handleMenuOnClick} />}>
          <Route path="/" element={<Home mobileMenu={mobileMenu} />} />
          <Route path="/movies" element={<Movies mobileMenu={mobileMenu} />} />
          <Route path="/tv" element={<TVShows mobileMenu={mobileMenu} />} />
        </Route>
        <Route element={<Detailsandsearchlayout />}>
          <Route
            path="/details/movie/:id"
            element={<Details mediaType="movie" />}
          />
          <Route path="/details/tv/:id" element={<Details mediaType="tv" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorite />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
