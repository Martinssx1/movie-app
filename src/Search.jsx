import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BackHeader from "./BackHeader";
import FavoriteButton from "./favourite/FavoriteButton";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apikey = "7fb2198dd66a3bd9c3257d003f070a5e";

  const query = searchParams.get("query");
  const mediaType = searchParams.get("mediaType");

  useEffect(() => {
    if (!query || !mediaType) return;

    async function fetchSearchResults() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apikey}&query=${encodeURIComponent(
            query,
          )}&page=${page}`,
        );
        const data = await res.json();
        setSearchResults((prev) =>
          page === 1
            ? data
            : { ...prev, results: [...prev.results, ...data.results] },
        );
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query, page, mediaType, apikey]);

  function handleClick(id, mediaType) {
    if (mediaType === "movie") {
      navigate(`/details/movie/${id}`);
    } else if (mediaType === "tv") {
      navigate(`/details/tv/${id}`);
    }
  }

  function loadMore() {
    setPage((prev) => prev + 1);
  }
  function multi(itemMediaType, mediaType) {
    itemMediaType ? itemMediaType : mediaType;
    if (itemMediaType === "movie" || mediaType === "movie") {
      return "🎬 Movie ";
    } else if (itemMediaType === "tv" || mediaType === "tv") {
      return "📺 TV Show";
    } else {
      return "Individual";
    }
  }

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-900 text-orange-950 flex items-center justify-center">
        <p className="text-2xl">No search query provided</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-gray-900 dark:text-orange-950">
      <BackHeader />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-orange-950 text-4xl font-bold mb-2">
          Search Results for: "{query}"
        </h1>
        <p className="text-gray-400 mb-8">
          Found {searchResults?.total_results || 0} results
        </p>

        {loading && page === 1 ? (
          <div className="text-white text-center text-2xl">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults?.results?.map((item) => (
                <div
                  key={`${mediaType}-${item.id}`}
                  onClick={() =>
                    handleClick(
                      item.id,
                      item.media_type ? item.media_type : mediaType,
                    )
                  }
                  className="
                cursor-pointer rounded-lg p-2
                bg-gray-100 dark:bg-black
                hover:scale-105 transition
                border border-gray-200 dark:border-orange-950 relative
              "
                >
                  <FavoriteButton
                    item={{
                      id: item.id,
                      media_type: item.media_type || mediaType,
                    }}
                  />
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                        : "/no-poster-image.jpg"
                    }
                    alt={item.title || item.name}
                    className="rounded-lg mb-2"
                  />
                  <h3 className="text-orange-950 font-semibold text-sm">
                    {item.title || item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {multi(item.media_type, mediaType)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ⭐ {item.vote_average?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {searchResults?.total_pages > page && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="
                px-8 py-3 rounded-lg font-bold
                bg-gray-900 text-white
                dark:bg-orange-950 dark:text-black
                hover:opacity-80
              "
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}

            {/* No results */}
            {searchResults?.results?.length === 0 && (
              <div className="text-white text-center text-xl mt-10">
                No results found for "{query}"
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
