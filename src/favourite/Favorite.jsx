import { useEffect, useState } from "react";
import { GlobalFavourite } from "./ContextFavourite";
import { useNavigate } from "react-router-dom";

import FavoriteButton from "./FavoriteButton";
function Favorite() {
  const { favourites } = GlobalFavourite();
  const navigate = useNavigate();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const apikey = "7fb2198dd66a3bd9c3257d003f070a5e";

  useEffect(() => {
    if (favourites.length === 0) {
      setFavoriteItems([]);
      return;
    }
    async function getFav() {
      setLoading(true);
      try {
        const results = await Promise.all(
          favourites.map(async ({ id, mediatype }) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/${mediatype}/${id}?api_key=${apikey}`,
            );
            if (!res.ok) {
              throw new Error(
                `Failed to fetch item with id ${id} and endpoint ${mediatype}`,
              );
            }
            const data = await res.json();
            return { ...data, mediatype: mediatype };
          }),
        );

        setFavoriteItems(results);
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      } finally {
        setLoading(false);
      }
    }

    getFav();
  }, [favourites]);
  async function clickM(id, mediatype) {
    if (mediatype === "movie") {
      navigate(`/details/movie/${id}`);
    } else {
      navigate(`/details/tv/${id}`);
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center min-h-screen items-center">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 dark:border-t-orange-950" />
        </div>
      ) : (
        <div className="p-4 ">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
            {favoriteItems.length > 0 ? (
              favoriteItems.map((item, i) => (
                <div
                  key={`${i}-${item.id}-${item.mediatype}`}
                  onClick={() => clickM(item.id, item.mediatype)}
                  className="
                cursor-pointer rounded-lg p-2
                bg-gray-100 dark:bg-black
                hover:scale-105 transition
                border border-gray-200 dark:border-orange-950 relative min-h-70
              "
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
                      ⭐ {item.vote_average?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>
                  <FavoriteButton
                    item={{
                      id: item.id,
                      media_type: item.mediatype,
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No favorite items found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Favorite;
