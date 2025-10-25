import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apikey = "7fb2198dd66a3bd9c3257d003f070a5e";

  const query = searchParams.get("query"); // Get search query from URL
  function onclickback() {
    navigate("/");
  }
  useEffect(() => {
    if (!query) return;

    async function fetchSearchResults() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apikey}&query=${encodeURIComponent(
            query
          )}&page=${page}`
        );
        const data = await res.json();
        setSearchResults(data);
        console.log("Search results:", data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query, page]);

  function handleClick(id, mediaType) {
    if (mediaType === "movie") {
      navigate(`/details/movie/${id}`);
    } else if (mediaType === "tv") {
      navigate(`/details/tv/${id}`);
    }
  }

  function loadMore() {
    setPage(page + 1);
  }

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-900 text-orange-950 flex items-center justify-center">
        <p className="text-2xl">No search query provided</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-orange-950 p-4 flex items-center ">
        <span
          className="bg-[#121212] flex items-center p-1 font-bold mr-3 cursor-pointer"
          onClick={onclickback}
        >
          <img className="w-3 md:w-7" src="/backarrow.svg" alt="backarrow" />
          Go back
        </span>

        <div className="text-black font-[Bebas+Neue] text-xl md:text-3xl  font-extrabold tracking-wide ">
          MALIKMARTINS
        </div>
      </div>

      {/* Search Results */}
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
                  key={`${item.media_type}-${item.id}`}
                  onClick={() => handleClick(item.id, item.media_type)}
                  className="bg-black rounded-lg p-3 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_#431407] transition-all duration-300"
                >
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
                      {item.media_type === "movie" ? "🎬 Movie" : "📺 TV Show"}
                    </span>
                    <span className="text-xs text-gray-400">
                      ⭐ {item.vote_average?.toFixed(1)}
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
                  className="bg-orange-950 text-black font-bold px-8 py-3 rounded-lg hover:bg-orange-900 transition disabled:opacity-50"
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
