import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Movies = () => {
  const [searchMovies, setSearchMovies] = useState(null);
  const [searchMoviesResult, setSearchMoviesResult] = useState(false);
  const [searchMoviesText, setSearchMoviesText] = useState("");
  const [actionMovies, setActionMovies] = useState("");
  const [dramaMovie, setDramaMovie] = useState("");
  const [horrorMovie, setHorrorMovie] = useState("");
  const [thrillerMovie, setThrillerMovie] = useState("");
  const [animationMovie, setAnimationMovie] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const inputRef = useRef(true);
  const containerRef = useRef(false);
  const apikey = "7fb2198dd66a3bd9c3257d003f070a5e";
  function handleMenuOnClick() {
    if (mobileMenu) {
      setMobileMenu(false);
    } else {
      setMobileMenu(true);
    }
  }
  const searchOnlyMovieData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(
          searchMoviesText
        )}`
      );
      const data = await res.json();
      setSearchMovies(data);
      setSearchMoviesResult(true);
      console.log("moviesonly", data);
    } catch (err) {
      console.error("movies error", err);
    }
  }, [searchMoviesText]);

  useEffect(() => {
    const id = setTimeout(() => {
      searchOnlyMovieData();
    }, 500);
    return () => clearTimeout(id);
  }, [searchMoviesText, searchOnlyMovieData]);

  useEffect(() => {
    actionFetch();
    dramaFetch();
    horrorFetch();
    thrillerFetch();
    animationFetch();

    function focusSearch(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        return setSearchMoviesResult(false);
      }
    }
    document.addEventListener("click", focusSearch);

    // Cleanup on unmount
    return () => document.removeEventListener("click", focusSearch);
  }, []);

  /*data for searchmovie section */

  function handleOnlyMovieOnClick() {
    searchOnlyMovieData();
  }

  /*fetch by genre movie section */
  async function actionFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=28&sort_by=popularity.desc`
      );
      const data = await res.json();
      setActionMovies(data);
      console.log("action", data);
    } catch (err) {
      console.error("action movie error", err);
    }
  }
  /*fetch by DRAMA*/
  async function dramaFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=18&sort_by=popularity.desc`
      );
      const data = await res.json();
      setDramaMovie(data);
      console.log("Drama", data);
    } catch (err) {
      console.error("action movie error", err);
    }
  }
  /*fetch by Horror*/
  async function horrorFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=27&sort_by=popularity.desc`
      );
      const data = await res.json();
      setHorrorMovie(data);
      console.log("Drama", data);
    } catch (err) {
      console.error("action movie error", err);
    }
  }
  /*fetch by thriller */
  async function thrillerFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=53&sort_by=popularity.desc`
      );
      const data = await res.json();
      setThrillerMovie(data);
      console.log("Thriller", data);
    } catch (err) {
      console.error("action movie error", err);
    }
  }
  /*fetch by animation */
  async function animationFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=16&sort_by=popularity.desc`
      );
      const data = await res.json();
      setAnimationMovie(data);
      console.log("Animation", data);
    } catch (err) {
      console.error("animation  error", err);
    }
  }

  const searchonlyM = searchMovies?.results;
  const moviesactions = actionMovies?.results;
  const moviesdrama = dramaMovie?.results;
  const movieshorror = horrorMovie?.results;
  const moviesthriller = thrillerMovie?.results;
  const moviesanimation = animationMovie?.results;

  if (!moviesactions) return <div className="text-white">Loading...</div>;
  if (!moviesdrama) return <div className="text-white">Loading...</div>;
  if (!movieshorror) return <div className="text-white">Loading...</div>;
  if (!moviesthriller) return <div className="text-white">Loading...</div>;
  if (!moviesanimation) return <div className="text-white">Loading...</div>;
  return (
    <div>
      <div className="bg-orange-950 p-4 flex items-center justify-between">
        <div className="text-black font-[Bebas+Neue] text-xl md:text-3xl font-extrabold tracking-wide ">
          <span className=" inline-block hover:rotate-[1turn]  cursor-pointer transition-all duration-[0.7s] ease-in hover:scale-150">
            🎬
          </span>
          MALIKMARTINS
        </div>
        <div
          className=" md:hidden  cursor-pointer  "
          onClick={handleMenuOnClick}
        >
          <img src="/menu.svg" alt="" />
        </div>
        <div className="hidden  md:flex gap-10 font-bold text-xl">
          <div className="relative group">
            <Link to="/">HOME</Link>
            <div className="border-b-4 absolute w-0  -bottom-[20px] border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out  "></div>
          </div>
          <div className="relative ">
            <Link to="/movies">MOVIES</Link>
            <div className="border-b-4 absolute w-full  -bottom-[20px] border-black "></div>
          </div>
          <div className="relative group">
            <Link to="/tv">TV SHOWS</Link>
            <div className="border-b-4 absolute w-0  -bottom-[20px] border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out  "></div>
          </div>
        </div>
        {mobileMenu && (
          <div className=" absolute w-full  top-0 transform translate-y-15 right-0 z-10 flex flex-col bg-black opacity-70 text-white ">
            <Link to="/">
              <div className="p-2 border-b-2 border-orange-950 ">HOME</div>
            </Link>
            <Link to="/movies">
              <div className=" p-2 border-b-2 border-orange-950  ">MOVIES</div>
            </Link>
            <Link to="/tv">
              <div className=" p-2 border-b-2 border-orange-950  ">
                TV SHOWS
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center  mt-10 mb-15 px-4">
        {/* Search Container */}
        <div className="relative w-full max-w-[600px]" ref={containerRef}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnlyMovieOnClick();
            }}
          >
            <img
              src="/icon-search copy.svg"
              alt="searchicon"
              className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4"
            />

            {/* Input */}
            <input
              type="text"
              ref={inputRef}
              value={searchMoviesText}
              onFocus={() => setSearchMoviesResult(true)}
              placeholder="Search Movies..."
              className="w-full bg-black text-gray-100 outline-none h-10 pl-10 pr-4 rounded-lg border border-orange-950"
              onChange={(e) => setSearchMoviesText(e.target.value)}
            />

            {/* Search Button */}
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-950 text-black font-bold px-4 py-1 rounded-md border border-black"
            >
              Search
            </button>
          </form>

          {/* Results Box */}
          {searchMoviesResult && searchonlyM?.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-black border border-orange-950 mt-2 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {searchonlyM.slice(0, 5).map((watch, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 hover:bg-orange-950/20 border-b border-orange-950"
                >
                  <img
                    className="w-10 h-14 object-cover rounded"
                    src={
                      watch.poster_path
                        ? `https://image.tmdb.org/t/p/w92${watch.poster_path}`
                        : "/no-image.png"
                    }
                    alt={watch.title}
                  />
                  <div className="text-gray-200 text-sm">{watch.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-center mb-2  md:px-15  md:justify-start font-[Lobster] text-5xl text-orange-950  items-center gap-2">
        Action
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2">
        {moviesactions?.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="bg-black flex flex-col gap-1 rounded-2xl p-2 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_#431407] transition-all duration-300"
          >
            <div>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "/blackkk at 13.48.28_ec0a14a9.jpg"
                }
                className="rounded-2xl"
                alt={item.title}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.title}
              {
                <p className="text-sm text-gray-400">
                  ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                </p>
              }
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center mb-2  md:px-15  md:justify-start font-[Lobster] text-5xl text-orange-950  items-center gap-2">
        Drama
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2">
        {moviesdrama?.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="bg-black flex flex-col gap-1 rounded-2xl p-2 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_#431407] transition-all duration-300 "
          >
            <div>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "/no-image.png"
                }
                className="rounded-2xl"
                alt={item.title}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.title}
              {
                <p className="text-sm text-gray-400">
                  ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                </p>
              }
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center mb-2  md:px-15  md:justify-start font-[Lobster] text-5xl text-orange-950  items-center gap-2">
        Horror
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2">
        {movieshorror?.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="bg-black flex flex-col gap-1 rounded-2xl p-2 hover:scale-105 cursor-pointer  hover:shadow-[0_0_15px_#431407] transition-all duration-300"
          >
            <div>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "/no-image.png"
                }
                className="rounded-2xl"
                alt={item.title}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.title}
              {
                <p className="text-sm text-gray-400">
                  ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                </p>
              }
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center mb-2  md:px-15  md:justify-start font-[Lobster] text-5xl text-orange-950  items-center gap-2">
        Thriller
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2">
        {moviesthriller?.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="bg-black flex flex-col gap-1 rounded-2xl p-2 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_#431407] transition-all duration-300 "
          >
            <div>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "/no-image.png"
                }
                className="rounded-2xl"
                alt={item.title}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.title}
              {
                <p className="text-sm text-gray-400">
                  ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                </p>
              }
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center mb-2  md:px-15  md:justify-start font-[Lobster] text-5xl text-orange-950  items-center gap-2">
        Animation
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2">
        {moviesanimation?.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="bg-black flex flex-col gap-1 rounded-2xl p-2 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_#431407] transition-all duration-300"
          >
            <div>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "/no-image.png"
                }
                className="rounded-2xl"
                alt={item.title}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.title}
              {
                <p className="text-sm text-gray-400">
                  ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                </p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
