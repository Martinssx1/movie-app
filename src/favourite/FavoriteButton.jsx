import { Heart } from "lucide-react";

import { GlobalFavourite } from "./ContextFavourite";
export default function FavoriteButton({ item }) {
  const { manageFavorite, addFavorite, isFavorite, favoriteLoading } =
    GlobalFavourite();

  return (
    <button
      disabled={favoriteLoading}
      className="absolute top-3 right-3"
      onClick={async (e) => {
        e.stopPropagation();
        isFavorite(item) ? await manageFavorite(item) : await addFavorite(item);
      }}
    >
      <Heart
        size={32}
        strokeWidth={3}
        className={` dark:text-black hover:text-red-500 hover:fill-current transition-colors ${
          isFavorite(item) ? "fill-red-500" : ""
        }`}
      />
    </button>
  );
}
