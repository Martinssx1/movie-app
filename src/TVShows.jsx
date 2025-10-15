import { Link } from "react-router-dom";
import { useState, useCallback, useEffect, useRef } from "react";

const TVShows = () => {
  const [searchTv, setSearchTv] = useState(null);
  const [searchTvText, setSearchTvText] = useState("");
  const [searchTvResult, setSearchTvResult] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [actionTv, setActionTv] = useState("");
  const [dramaTv, setDramaTv] = useState("");
  const [horrorTv, setsciandfanTv] = useState("");
  const [mysteryTv, setmysteryTv] = useState("");
  const [animationTv, setAnimationTv] = useState("");
  const inputRef = useRef();
  const containerRef = useRef();
  const apikey = "7fb2198dd66a3bd9c3257d003f070a5e";
  function handleMenuOnClick() {
    if (mobileMenu) {
      setMobileMenu(false);
    } else {
      setMobileMenu(true);
    }
  }

  const searchOnlyTvData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apikey}&query=${encodeURIComponent(
          searchTvText
        )}`
      );
      const data = await res.json();
      setSearchTv(data);
      setSearchTvResult(true);
      console.log("TV only", data);
    } catch (err) {
      console.error("TV error", err);
    }
  }, [searchTvText]);

  useEffect(() => {
    const id = setTimeout(() => {
      searchOnlyTvData();
    }, 500);
    return () => clearTimeout(id);
  }, [searchTvText, searchOnlyTvData]);

  useEffect(() => {
    actionFetch();
    dramaFetch();
    sciandfantasyFetch();
    mysteryFetch();
    animationFetch();
    function focussearch(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        return setSearchTvResult(false);
      }
    }
    document.addEventListener("click", focussearch);
    return () => document.removeEventListener("click", focussearch);
  }, []);
  /*data for searchmovie section */

  function handleOnlyMovieOnClick() {
    searchOnlyTvData();
  }

  /*fetch by genre movie section */
  async function actionFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&with_genres=10759&sort_by=popularity.desc`
      );
      const data = await res.json();
      setActionTv(data);
      console.log("action", data);
    } catch (err) {
      console.error("action Tv error", err);
    }
  }
  /*fetch by DRAMA*/
  async function dramaFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&with_genres=18&sort_by=popularity.desc`
      );
      const data = await res.json();
      setDramaTv(data);
      console.log("Drama", data);
    } catch (err) {
      console.error("action TV error", err);
    }
  }
  /*fetch by sci&fan*/
  async function sciandfantasyFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&with_genres=10764&sort_by=popularity.desc`
      );
      const data = await res.json();
      setsciandfanTv(data);
      console.log("Drama", data);
    } catch (err) {
      console.error("action movie error", err);
    }
  }
  /*fetch by mystery */
  async function mysteryFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&with_genres=9648&sort_by=popularity.desc`
      );
      const data = await res.json();
      setmysteryTv(data);
      console.log("mystery", data);
    } catch (err) {
      console.error("mystery error", err);
    }
  }
  /*fetch by animation */
  async function animationFetch() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&with_genres=16&sort_by=popularity.desc`
      );
      const data = await res.json();
      setAnimationTv(data);
      console.log("Animation", data);
    } catch (err) {
      console.error("animation  error", err);
    }
  }

  const searchonlyTv = searchTv?.results;
  const tvactions = actionTv?.results;
  const tvdrama = dramaTv?.results;
  const tvscifiandfantasy = horrorTv?.results;
  const tvmystery = mysteryTv?.results;
  const tvanimation = animationTv?.results;

  if (!tvactions) return <div className="text-white">Loading...</div>;
  if (!tvdrama) return <div className="text-white">Loading...</div>;
  if (!tvscifiandfantasy) return <div className="text-white">Loading...</div>;
  if (!tvmystery) return <div className="text-white">Loading...</div>;
  if (!tvanimation) return <div className="text-white">Loading...</div>;

  return (
    <div className="relative">
      <div className="bg-orange-950 p-4 flex items-center justify-between">
        <div className="text-black font-[Bebas+Neue] text-xl md:text-3xl font-extrabold tracking-wide ">
          <span className=" inline-block hover:rotate-[1turn]  cursor-pointer transition-all duration-[0.7s] ease-in hover:scale-150">
            🎬
          </span>
          MALIKMARTINS
        </div>
        <div className=" md:hidden cursor-pointer " onClick={handleMenuOnClick}>
          <img src="/menu.svg" alt="menu" />
        </div>

        <div className="hidden  md:flex gap-10 font-bold text-xl">
          <div className="relative group">
            <Link to="/">HOME</Link>
            <div className="border-b-4 absolute w-0  -bottom-[20px] border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out  "></div>
          </div>
          <div className="relative group ">
            <Link to="/movies">MOVIES</Link>
            <div className="border-b-4 absolute w-0  -bottom-[20px] border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out  "></div>
          </div>
          <div className="relative ">
            <Link to="/tv">TV SHOWS</Link>
            <div className="border-b-4 absolute w-full  -bottom-[20px] border-black "></div>
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
              className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4 "
            />

            {/* Input */}
            <input
              type="text"
              ref={inputRef}
              value={searchTvText}
              onFocus={() => setSearchTvResult(true)}
              placeholder="Search Tvshows..."
              className="w-full bg-black text-gray-100 outline-none h-10 pl-10 pr-4 rounded-lg border border-orange-950"
              onChange={(e) => setSearchTvText(e.target.value)}
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
          {searchTvResult && searchonlyTv?.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-black border border-orange-950 mt-2 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {searchonlyTv.slice(0, 5).map((watch, i) => (
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
                    alt={watch.name}
                  />
                  <div className="text-gray-200 text-sm">{watch.name}</div>
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
        {tvactions?.slice(0, 12).map((item) => (
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
                alt={item.name}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.name}
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
        {tvdrama?.slice(0, 12).map((item) => (
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
                alt={item.name}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.name}
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
        sci-fi & Fantasy
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2">
        {tvscifiandfantasy?.slice(0, 12).map((item) => (
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
                alt={item.name}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.name}
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
        Mystery
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2">
        {tvmystery?.slice(0, 12).map((item) => (
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
                alt={item.name}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.name}
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
        {tvanimation?.slice(0, 12).map((item) => (
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
                alt={item.name}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.name}
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

export default TVShows;
