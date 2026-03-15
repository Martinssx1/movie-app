import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Allskeletons from "./Skeletons/Allskeletons";
import MenuButton from "./Buttons/MenuButton";
import SearchButton from "./Buttons/SearchButton";
import FavoriteButton from "./favourite/FavoriteButton";

const Home = ({ mobileMenu }) => {
  const [searchAll, setSearchAll] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [sData, setData] = useState(null);
  const [visibleMovies, setVisibleMovies] = useState(false);

  const navigate = useNavigate();
  const movieCardsRef = useRef(null);
  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  /*intersection observer for movie cards */
  useEffect(() => {
    if (!movieCardsRef.current) return;

    const observer = new IntersectionObserver(
      ([Entry]) => {
        if (Entry.isIntersecting) {
          setVisibleMovies(true);
          observer.unobserve(Entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 150px 0px" },
    );
    if (movieCardsRef.current) {
      observer.observe(movieCardsRef.current);
    }
    return () => observer.disconnect();
  }, [sData]);

  useEffect(() => {
    function fetchAllData() {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/trending/all/week?page=1&api_key=${apikey}`,
        ).then((res) => res.json()),
        fetch(
          `https://api.themoviedb.org/3/trending/all/week?page=2&api_key=${apikey}`,
        ).then((res) => res.json()),
      ])
        .then(([page1, page2]) => {
          if (!page1?.results || !page2?.results) {
            console.error("One of the API responses is invalid:", page1, page2);
            return;
          }

          const combined = [...page1.results, ...page2.results];

          setData(combined);
        })
        .catch((err) => console.error("Fetch error:", err));
    }
    fetchAllData();
    function focusSearch(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSearchResult(false);
      }
    }
    document.addEventListener("click", focusSearch);
    return () => document.removeEventListener("click", focusSearch);
  }, [apikey]);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const search = searchAll?.results;

  function handleOnClickSearch() {
    if (searchText.trim()) {
      navigate(
        `/search?query=${encodeURIComponent(searchText)}&mediaType=multi`,
      );
    }
  }
  /*Home search*/
  const fetchSearchData = useCallback(async () => {
    if (!searchText.trim()) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apikey}&query=${encodeURIComponent(
          searchText,
        )}`,
      );
      const data = await response.json();
      setSearchAll(data);
      setSearchResult(true);
    } catch (err) {
      console.error("error:", err);
    }
  }, [searchText, apikey]);
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

  async function clickM(id, mediatype) {
    if (mediatype === "movie") {
      navigate(`/details/movie/${id}`);
    } else {
      navigate(`/details/tv/${id}`);
    }
  }

  if (!sData)
    return (
      <>
        <Allskeletons />
      </>
    );
  const trending = sData;

  return (
    <>
      <MenuButton menuButtonProps={mobileMenu} />
      <div
        className="flex flex-col items-center mt-10 mb-10 px-4"
        ref={containerRef}
      >
        {/* Search Container */}
        <div className="relative w-full max-w-150">
          {/* Search Icon */}
          <img
            src="/icon-search copy.svg"
            alt="searchicon"
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4"
          />

          <form
            name="searchAllForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleOnClickSearch();
            }}
          >
            <input
              type="text"
              name="searchInput"
              ref={inputRef}
              value={searchText}
              onFocus={() => setSearchResult(true)}
              placeholder="Search..."
              className="
    w-full
    bg-white text-gray-900
    dark:bg-black dark:text-gray-100
    outline-none h-10 pl-10 pr-4 rounded-lg
    border border-gray-300 dark:border-orange-950
    focus:ring-2 focus:ring-blue-400 dark:focus:ring-orange-950
  "
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* Search Button */}
            <SearchButton />
          </form>

          {/* Results Box */}
          {searchResult && search?.length > 0 && (
            <div
              className="
  absolute top-full left-0 w-full
  bg-white dark:bg-black
  border border-gray-300 dark:border-orange-950
  mt-2 rounded-md shadow-lg z-50
  max-h-64 overflow-y-auto
"
            >
              {search.slice(0, 5).map((watch, i) => (
                <div
                  key={`${watch.id}-${i}`}
                  onClick={() => clickM(watch.id, watch.media_type)}
                  className="
  flex items-center gap-3 p-2
  hover:bg-blue-100 dark:hover:bg-orange-950/20
  border-b border-gray-200 dark:border-orange-950
"
                >
                  <img
                    className="w-10 h-14 object-cover rounded"
                    src={
                      watch.poster_path
                        ? `https://image.tmdb.org/t/p/w500${watch.poster_path}`
                        : "/no-poster-image.jpg"
                    }
                    alt={watch.name || watch.title}
                  />
                  <div className="text-gray-900 dark:text-gray-200 text-sm">
                    {watch.title || watch.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Trending Section */}
      <div
        className="
  flex justify-center md:px-15 md:justify-start
  font-[Lobster] text-5xl
  text-gray-900 dark:text-orange-950
  items-center gap-2 
"
      >
        Trending <span className="animate-pulse text-3xl">🔥</span>
      </div>

      <div
        ref={movieCardsRef}
        className=" grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5  gap-4 p-3"
      >
        {trending?.map((item, i) => (
          <div
            key={`${item.id}-${item.media_type}-${i}`}
            onClick={() => clickM(item.id, item.media_type)}
            className={`
  ${visibleMovies ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
  transition-all duration-600
  p-2 rounded-lg cursor-pointer
  bg-white dark:bg-black
  border border-gray-200 dark:border-orange-950
  hover:scale-105 hover:duration-200
  hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]
  dark:hover:shadow-[0_0_15px_#431407]
`}
          >
            <div className="flex flex-col gap-3 border-rounded">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "/no-poster-image.jpg"
                }
                className="min-h-70"
                alt={item.name || item.title}
              />
            </div>
            <div className="text-gray-900 dark:text-orange-950 text-lg">
              {item.name || item.title}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ⭐ {item.vote_average?.toFixed(1) ?? "N/A"} ({item.vote_count})
              </p>
              <FavoriteButton item={item} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
