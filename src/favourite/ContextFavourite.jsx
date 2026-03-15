import { createContext, useEffect, useContext } from "react";
import { useState } from "react";
const favContext = createContext(undefined);
export default function ContextFavourite({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const savedFavourite = localStorage.getItem("favourite");
    return savedFavourite ? JSON.parse(savedFavourite) : [];
  });
  function clickS(id, mediatype) {
    if (
      favourites.some((fav) => fav.id === id && fav.mediatype === mediatype)
    ) {
      setFavourites((prev) =>
        prev.filter((fav) => !(fav.id === id && fav.mediatype === mediatype)),
      );
    } else {
      setFavourites((prev) => [...prev, { id, mediatype }]);
    }
  }

  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favourites));
  }, [favourites]);
  return (
    <favContext.Provider value={{ favourites, clickS }}>
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
