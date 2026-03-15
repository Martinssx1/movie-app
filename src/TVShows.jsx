import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import Allskeletons from "./Skeletons/Allskeletons";
import SearchButton from "./Buttons/SearchButton";
import MenuButton from "./Buttons/MenuButton";
import FavoriteButton from "./favourite/FavoriteButton";

const TVShows = ({ mobileMenu }) => {
  const [searchTv, setSearchTv] = useState(null);
  const [refReady, setRefReady] = useState(false);
  const [searchTvText, setSearchTvText] = useState("");
  const [searchTvResult, setSearchTvResult] = useState(false);
  const genresRefs = useRef({});

  const [fetchDataTv, setFetchDataTv] = useState({
    action: null,
    drama: null,
    animation: null,
    mystery: null,
    sciandfan: null,
  });
  const [visibleGenre, setVisibleGenre] = useState({
    action: false,
    drama: false,
    animation: false,
    mystery: false,
    sciandfan: false,
  });
  const genres = useMemo(
    () => ["action", "drama", "sciandfan", "mystery", "animation"],
    [],
  );
  const inputRef = useRef();
  const containerRef = useRef();
  const navigate = useNavigate();
  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  const query = searchTvText;

  useEffect(() => {
    if (!refReady) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const genre = entry.target.dataset.genre;
            setVisibleGenre((prev) => ({ ...prev, [genre]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    genres.forEach((genre) => {
      observer.observe(genresRefs.current[genre]);
    });
    return () => observer.disconnect();
  }, [genres, refReady]);

  // Update handleOnClickSearch:
  function handleOnClickSearch() {
    if (searchTvText.trim()) {
      navigate(
        `/search?query=${encodeURIComponent(searchTvText)}&mediaType=tv`,
      );
    }
  }

  const searchOnlyTvData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apikey}&query=${encodeURIComponent(
          query,
        )}`,
      );
      const data = await res.json();
      setSearchTv(data);
      setSearchTvResult(true);
    } catch (err) {
      console.error("TV error", err);
    }
  }, [query, apikey]);

  useEffect(() => {
    const id = setTimeout(() => {
      searchOnlyTvData();
    }, 500);
    return () => clearTimeout(id);
  }, [searchTvText, searchOnlyTvData]);

  useEffect(() => {
    async function allTvDataFetch(key, genre) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&with_genres=${genre}&sort_by=popularity.desc`,
        );
        const data = await res.json();
        setFetchDataTv((prev) => ({ ...prev, [key]: data }));
      } catch (err) {
        console.error("couldnt fetch TVshows Data", err);
      }
    }
    allTvDataFetch("action", 10759);
    allTvDataFetch("drama", 18);
    allTvDataFetch("sciandfan", 10764);
    allTvDataFetch("mystery", 9648);
    allTvDataFetch("animation", 16);

    function focussearch(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        return setSearchTvResult(false);
      }
    }
    document.addEventListener("click", focussearch);
    return () => document.removeEventListener("click", focussearch);
  }, [apikey]);

  async function clickM(id) {
    navigate(`/details/tv/${id}`);
  }

  const searchonlyTv = searchTv?.results;

  if (
    !fetchDataTv.action ||
    !fetchDataTv.drama ||
    !fetchDataTv.sciandfan ||
    !fetchDataTv.mystery ||
    !fetchDataTv.animation
  )
    return <Allskeletons />;

  return (
    <div>
      <MenuButton menuButtonProps={mobileMenu} />

      <div className="flex flex-col items-center  mt-10 mb-15 px-4">
        {/* Search Container */}
        <div className="relative w-full max-w-150" ref={containerRef}>
          <form
            name="searchTvForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleOnClickSearch();
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
              name="searchInput"
              ref={inputRef}
              value={searchTvText}
              onFocus={() => setSearchTvResult(true)}
              placeholder="Search Tvshows..."
              className="
    w-full
    bg-white text-gray-900
    dark:bg-black dark:text-gray-100
    outline-none h-10 pl-10 pr-4 rounded-lg
    border border-gray-300 dark:border-orange-950
    focus:ring-2 focus:ring-blue-400 dark:focus:ring-orange-950
  "
              onChange={(e) => setSearchTvText(e.target.value)}
            />

            <SearchButton query={searchTvText} mediaType="tv" />
          </form>

          {/* Results Box */}
          {searchTvResult && searchonlyTv?.length > 0 && (
            <div
              className="
  absolute top-full left-0 w-full
  bg-white dark:bg-black
  border border-gray-300 dark:border-orange-950
  mt-2 rounded-md shadow-lg z-50
  max-h-64 overflow-y-auto
"
            >
              {searchonlyTv.slice(0, 5).map((watch) => (
                <div
                  key={watch.id}
                  onClick={() => clickM(watch.id)}
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
                    alt={watch.name}
                  />
                  <div className="text-gray-900 dark:text-gray-200 text-sm">
                    {watch.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {genres.map((genre) => (
        <div key={genre} className="flex flex-col ">
          <header className="heading-text">{genre.toUpperCase()}</header>
          <div
            ref={(el) => {
              if (!el) return;
              genresRefs.current[genre] = el;
              if (Object.keys(genresRefs.current).length === genres.length) {
                setRefReady(true);
              }
            }}
            data-genre={genre}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2"
          >
            {fetchDataTv[genre]?.results?.slice(0, 12).map((item) => (
              <div
                key={item.id}
                onClick={() => clickM(item.id)}
                className={`card transition-all duration-600 ${
                  visibleGenre[genre]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                        : "/no-poster-image.jpg"
                    }
                    className="rounded-2xl min-h-70"
                    alt={item.name}
                  />
                </div>
                <div className="text-gray-900 dark:text-gray-200 text-sm">
                  {item.name}
                  {
                    <p className="text-sm text-gray-400">
                      ⭐ {item.vote_average?.toFixed(1) ?? "N/A"} (
                      {item.vote_count})
                    </p>
                  }
                </div>
                <FavoriteButton item={{ id: item.id, media_type: "tv" }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TVShows;
