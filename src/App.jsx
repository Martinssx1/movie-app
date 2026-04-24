import { useEffect, useState } from "react";

import Home from "./Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Movies from "./Movies";
import TVShows from "./TVShows";
import Details from "./Details";
import Search from "./Search";
import Favorite from "./favourite/Favorite";
import Mainlayout from "./Routes/Mainlayout";
import Detailsandsearchlayout from "./Routes/Detailsandsearchlayout";
import ErrorFallback from "./Error/ErrorFallback";

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
          <Route
            path="/"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Home mobileMenu={mobileMenu} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/movies"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Movies mobileMenu={mobileMenu} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/tv"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <TVShows mobileMenu={mobileMenu} />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route element={<Detailsandsearchlayout />}>
          <Route
            path="/details/movie/:id"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Details mediaType="movie" />
              </ErrorBoundary>
            }
          />
          <Route
            path="/details/tv/:id"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Details mediaType="tv" />
              </ErrorBoundary>
            }
          />
          <Route
            path="/search"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Search />
              </ErrorBoundary>
            }
          />
          <Route
            path="/favorites"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Favorite />
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
