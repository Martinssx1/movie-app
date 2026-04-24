import { GlobalFavourite } from "./ContextFavourite";
import { useNavigate } from "react-router-dom";

import FavoriteButton from "./FavoriteButton";
function Favorite() {
  const { favorites } = GlobalFavourite();
  const navigate = useNavigate();

  async function clickM(id, mediatype) {
    if (mediatype === "movie") {
      navigate(`/details/movie/${id}`);
    } else {
      navigate(`/details/tv/${id}`);
    }
  }

  return (
    <>
      <div className="p-4 ">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                onClick={() => clickM(item.movie_id, item.media_type)}
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
                  className="rounded-lg mb-2 min-h-70"
                />
                <h3 className="text-orange-950 font-semibold text-sm">
                  {item.title || item.name}
                </h3>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {item.media_type === "movie" ? "🎬 Movie" : "📺 TV Show"}
                  </span>
                  <span className="text-xs text-gray-400">
                    ⭐ {item.ratings?.toFixed(1) ?? "N/A"}
                  </span>
                </div>
                <FavoriteButton
                  item={{
                    movie_id: item.movie_id,
                    title: item.title || item.name,
                    media_type: item.media_type,
                    poster_path: item.poster_path,
                    vote_average: item.ratings || item.vote_average,
                  }}
                />
              </div>
            ))
          ) : (
            <p>No favorite items found.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default Favorite;
