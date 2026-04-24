import { createContext, useEffect, useContext } from "react";
import { useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../Signup/Signin/UseAuth";
const favContext = createContext(undefined);
export default function ContextFavourite({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const loadingRef = useRef(false);

  const { user, setShowAuth } = useAuth();

  async function loadFavorite() {
    const { data, error } = await supabase.from("Favorites").select("*");

    if (error) {
      console.error("Error fetching favorites:", error);
    } else {
      setFavorites(data);
    }
  }
  async function addFavorite(movie) {
    if (loadingRef.current) return;
    if (!user) {
      setShowAuth(true);
      return;
    }
    loadingRef.current = true;
    setFavoriteLoading(true);
    try {
      const { error } = await supabase.from("Favorites").insert({
        user_id: user.id,
        movie_id: movie.movie_id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        media_type: movie.media_type,
        ratings: movie.vote_average,
      });

      if (error) {
        if (error.code === "23505") {
          console.log("Already in favorites");
        }

        console.error("Error adding favorite:", error);
      } else {
        await loadFavorite();
      }
    } finally {
      loadingRef.current = false;
      setFavoriteLoading(false);
    }
  }

  async function manageFavorite(movie) {
    const { error } = await supabase
      .from("Favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", movie.movie_id)
      .eq("media_type", movie.media_type);

    if (error) {
      console.error("Error removing favorite:", error);
    } else {
      await loadFavorite();
    }
  }
  function isFavorite(item) {
    return favorites.some(
      (fav) =>
        fav.movie_id === item.movie_id &&
        fav.media_type === item.media_type &&
        fav.user_id === user?.id,
    );
  }
  useEffect(() => {
    loadFavorite();
  }, []);

  return (
    <favContext.Provider
      value={{
        favorites,
        manageFavorite,
        addFavorite,
        isFavorite,
        setFavorites,
        loadFavorite,
        favoriteLoading,
      }}
    >
      {children}
    </favContext.Provider>
  );
}
export function GlobalFavourite() {
  const overFavourite = useContext(favContext);
  if (overFavourite === undefined) {
    throw new Error(
      "GlobalFavourite must be used within a ContextFavourite provider",
    );
  }
  return overFavourite;
}
