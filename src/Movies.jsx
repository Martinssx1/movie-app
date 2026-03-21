import React, { useCallback, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "./Buttons/MenuButton";
import { useState } from "react";
import Allskeletons from "./Skeletons/Allskeletons";
import SearchButton from "./Buttons/SearchButton";
import FavoriteButton from "./favourite/FavoriteButton";
const Movies = ({ mobileMenu }) => {
  const [refsReady, setRefsReady] = useState(false);
  const [searchMovies, setSearchMovies] = useState(null);
  const [searchMoviesResult, setSearchMoviesResult] = useState(false);
  const [searchMoviesText, setSearchMoviesText] = useState("");
  const [fetchAllData, setFetchAllData] = useState({
    action: null,
    drama: null,
    horror: null,
    thriller: null,
    animation: null,
  });
  const navigate = useNavigate();

  const genres = useMemo(
    () => ["action", "drama", "horror", "thriller", "animation"],
    [],
  );

  const genreRefs = useRef({});

  const [visibleGenreMovies, setVisibleGenreMovies] = useState({
    action: false,
    drama: false,
    horror: false,
    thriller: false,
    animation: false,
  });

  useEffect(() => {
    if (!refsReady) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const genre = entry.target.dataset.genre;

            setVisibleGenreMovies((prev) => ({ ...prev, [genre]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    // For each genre container
    genres.forEach((genre) => {
      const element = genreRefs.current[genre];

      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [genres, refsReady]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const apikey = "7fb2198dd66a3bd9c3257d003f070a5e";

  const searchOnlyMovieData = useCallback(async () => {
    if (!searchMoviesText.trim()) return;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(
          searchMoviesText,
        )}`,
      );
      const data = await res.json();
      setSearchMovies(data);
      setSearchMoviesResult(true);
    } catch (err) {
      console.error("movies error", err);
    }
  }, [apikey, searchMoviesText]);

  useEffect(() => {
    const id = setTimeout(() => {
      searchOnlyMovieData();
    }, 500);
    return () => clearTimeout(id);
  }, [searchOnlyMovieData]);
  useEffect(() => {
    async function fetchByGenre(genre, key) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=${genre}&sort_by=popularity.desc`,
        );
        const data = await res.json();
        setFetchAllData((prevData) => ({ ...prevData, [key]: data }));
      } catch (err) {
        console.error(`${key} error`, err);
      }
    }
    fetchByGenre(28, "action");
    fetchByGenre(18, "drama");
    fetchByGenre(27, "horror");
    fetchByGenre(53, "thriller");
    fetchByGenre(16, "animation");
  }, [apikey]);

  useEffect(() => {
    function focusSearch(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        return setSearchMoviesResult(false);
      }
    }
    document.addEventListener("click", focusSearch);

    return () => document.removeEventListener("click", focusSearch);
  }, []);
  {
    /*for details */
  }
  async function clickM(id) {
    navigate(`/details/movie/${id}`);
  }
  // Update handleOnClickSearch:
  function handleOnClickSearch() {
    if (searchMoviesText.trim()) {
      navigate(
        `/search?query=${encodeURIComponent(searchMoviesText)}&mediaType=movie`,
      );
    }
  }

  const searchonlyM = searchMovies?.results;

  if (
    !fetchAllData.action ||
    !fetchAllData.drama ||
    !fetchAllData.horror ||
    !fetchAllData.thriller ||
    !fetchAllData.animation
  )
    return (
      <>
        <Allskeletons />
      </>
    );

  return (
    <div>
      <MenuButton menuButtonProps={mobileMenu} />

      <div className="flex flex-col items-center  mt-10 mb-15 px-4">
        {/* Search Container */}
        <div className="relative w-full max-w-150" ref={containerRef}>
          <form
            name="searchMovieForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleOnClickSearch();
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
              name="searchInput"
              ref={inputRef}
              value={searchMoviesText}
              onFocus={() => setSearchMoviesResult(true)}
              placeholder="Search Movies..."
              className="
    w-full
    bg-white text-gray-900
    dark:bg-black dark:text-gray-100
    outline-none h-10 pl-10 pr-4 rounded-lg
    border border-gray-300 dark:border-orange-950
    focus:ring-2 focus:ring-blue-400 dark:focus:ring-orange-950
  "
              onChange={(e) => setSearchMoviesText(e.target.value)}
            />

            <SearchButton />
          </form>

          {/* Results Box */}
          {searchMoviesResult && searchonlyM?.length > 0 && (
            <div
              className="
  absolute top-full left-0 w-full
  bg-white dark:bg-black
  border border-gray-300 dark:border-orange-950
  mt-2 rounded-md shadow-lg z-50
  max-h-64 overflow-y-auto
"
            >
              {searchonlyM.slice(0, 5).map((watch, i) => (
                <div
                  key={`${watch.id}-${i}`}
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
                        ? `https://image.tmdb.org/t/p/w92${watch.poster_path}`
                        : "/no-poster-image.jpg"
                    }
                    alt={watch.title}
                  />
                  <div className="text-gray-900 dark:text-gray-200 text-sm">
                    {watch.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        {/*working on ref for each genre*/}
        {genres?.map((genre) => (
          <div key={genre} className="flex flex-col">
            <header className="heading-text">{genre.toUpperCase()}</header>

            <div
              ref={(el) => {
                genreRefs.current[genre] = el;
                const allSet = genres.every((g) => genreRefs.current[g]);

                if (allSet && !refsReady) {
                  setRefsReady(true);
                }
              }}
              data-genre={genre}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 mb-2"
            >
              {fetchAllData[genre]?.results?.slice(0, 12).map((item) => (
                <div
                  key={item.id}
                  onClick={() => clickM(item.id)}
                  className={` transition-all duration-600 card  ${
                    visibleGenreMovies[genre]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                          : "/blackkk at 13.48.28_ec0a14a9.jpg"
                      }
                      className="rounded-2xl min-h-70"
                      alt={item.title}
                    />
                  </div>
                  <div className="text-gray-900 dark:text-orange-950 text-lg">
                    {item.title}
                    {
                      <p className="text-sm dark:text-gray-400">
                        ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                      </p>
                    }
                  </div>
                  <FavoriteButton item={{ id: item.id, media_type: "movie" }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
