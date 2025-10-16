import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchAll, setSearchAll] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sData, setData] = useState(null);

  useEffect(() => {
    fetchAllData();
    function focusSearch(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSearchResult(false);
      }
    }
    document.addEventListener("click", focusSearch);
    return () => document.removeEventListener("click", focusSearch);
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
  const inputRef = useRef();
  const containerRef = useRef();
  const apikey = "7fb2198dd66a3bd9c3257d003f070a5e";
  const search = searchAll?.results;
  function handleMenuOnClick() {
    if (mobileMenu) {
      setMobileMenu(false);
    } else {
      setMobileMenu(true);
    }
  }
  /*Home search*/
  const fetchSearchData = useCallback(async () => {
    if (!searchText.trim()) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apikey}&query=${encodeURIComponent(
          searchText
        )}`
      );
      const data = await response.json();
      setSearchAll(data);
      setSearchResult(true);

      console.log(data);
    } catch (err) {
      console.error("error:", err);
    }
  }, [searchText]);
  useEffect(() => {
    if (!searchText.trim()) {
      setSearchAll(null);
      return;
    }
    const id = setTimeout(() => {
      fetchSearchData();
    }, 500);
    return () => clearTimeout(id);
  }, [searchText, fetchSearchData]);

  function handleOnClickSearch() {
    fetchSearchData();
  }

  if (!sData) return <div className="text-white">Loading...</div>;
  const trending = sData;

  return (
    <div>
      <div className="bg-orange-950 p-4 flex items-center justify-between">
        <div className="text-black font-[Bebas+Neue] text-xl md:text-3xl font-extrabold tracking-wide ">
          <span className=" inline-block hover:rotate-[1turn]  cursor-pointer transition-all duration-[0.7s] ease-in hover:scale-150">
            🎬
          </span>
          MALIKMARTINS
        </div>
        <div className=" md:hidden cursor-pointer" onClick={handleMenuOnClick}>
          <img src="/menu.svg" alt="menu" />
        </div>
        <div className=" hidden md:flex gap-10 font-bold text-xl">
          <div className="relative group">
            <div>
              <Link to="/">HOME</Link>
            </div>
            <div className=" absolute -bottom-[20px]   w-full border-b-4 border-black  "></div>
          </div>

          <div className="relative group">
            <Link to="/movies">MOVIES</Link>
            <div className="border-b-4 absolute w-0  -bottom-[20px] border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out  "></div>
          </div>
          <div className="relative group">
            <Link to="/tv">TV SHOWS</Link>
            <div className="border-b-4 absolute w-0  -bottom-[20px] border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out  "></div>
          </div>
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
            <div className=" p-2 border-b-2 border-orange-950  ">TV SHOWS</div>
          </Link>
        </div>
      )}
      <div
        className="flex flex-col items-center mt-10 mb-10 px-4"
        ref={containerRef}
      >
        {/* Search Container */}
        <div className="relative w-full max-w-[600px]">
          {/* Search Icon */}
          <img
            src="/icon-search copy.svg"
            alt="searchicon"
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4"
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnClickSearch();
            }}
          >
            {/* Input */}
            <input
              type="text"
              ref={inputRef}
              value={searchText}
              onFocus={() => setSearchResult(true)}
              placeholder="Search..."
              className="w-full bg-black text-gray-100 outline-none h-10 pl-10 pr-4 rounded-lg border border-orange-950"
              onChange={(e) => setSearchText(e.target.value)}
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
          {searchResult && search?.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-black border border-orange-950 mt-2 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {search.slice(0, 5).map((watch, i) => (
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
                    alt={watch.name || watch.title}
                  />
                  <div className="text-gray-200 text-sm">
                    {watch.title || watch.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-center  md:px-15  md:justify-start font-[Lobster] text-5xl text-orange-950  items-center gap-2">
        Trending <span className="animate-pulse text-3xl">🔥</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 p-3">
        {trending?.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className=" hover:scale-105 hover:cursor-pointer hover:shadow-[0_0_15px_#431407] transition-all duration-300 p-2 bg-black"
          >
            <div className="flex flex-col gap-3 border-rounded">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "/blackkk at 13.48.28_ec0a14a9.jpg"
                }
                alt={item.name || item.title}
              />
            </div>
            <div className="text-orange-950 text-lg ">
              {item.name || item.title}
              {
                <p className="text-sm text-gray-400">
                  ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                </p>
              }
            </div>
          </div>
        ))}
      </div>
      <footer className="bg-black text-gray-400 flex flex-col gap-3 items-center ">
        <div>🎬 MALIKMARTINS</div>
        <div>Made with ❤️ by Chima Martins</div>
        <div>Uses TMDB API — Not endorsed by TMDB </div>
        <div>[ GitHub ] [ LinkedIn ] [ Portfolio ]</div>
      </footer>
    </div>
  );
};

export default Home;
