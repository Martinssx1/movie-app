import { Heart } from "lucide-react";

import { GlobalFavourite } from "./ContextFavourite";
export default function FavoriteButton({ item }) {
  const { favourites, clickS } = GlobalFavourite();

  return (
    <button
      className="absolute top-3 right-3"
      onClick={(e) => {
        e.stopPropagation();
        clickS(item.id, item.media_type);
      }}
    >
      <Heart
        size={32}
        strokeWidth={3}
        className={` dark:text-black hover:text-red-500 hover:fill-current transition-colors ${
          favourites.some(
            (fav) => fav.id === item.id && fav.mediatype === item.media_type,
          )
            ? "fill-red-500"
            : ""
        }`}
      />
    </button>
  );
}
