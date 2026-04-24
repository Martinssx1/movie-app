import { NavLink } from "react-router-dom";

import ThemeButton from "./Theme/ThemeButton";
import { User, CircleUser } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import NavFavouriteButton from "./Buttons/NavFavouriteButton";
import { useAuth } from "./Signup/Signin/UseAuth";
import { GlobalFavourite } from "./favourite/ContextFavourite";
function Navbar({ handleMenuOnClick }) {
  const [showHeader, setShowHeader] = useState(true);
  const prevScroll = useRef(0);
  const { user, toggleAuth, signOut } = useAuth();
  const { setFavorites } = GlobalFavourite();

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;

      currentScroll > prevScroll.current && currentScroll > 30
        ? setShowHeader(false)
        : setShowHeader(true);
      prevScroll.current = currentScroll;
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScroll]);
  async function handleSignOut() {
    const { error } = await signOut();
    if (!error) setFavorites([]);
  }
  return (
    <div
      className={` ${showHeader ? "translate-y-0 " : "-translate-y-full "} dark:bg-orange-950  bg-white p-4 flex items-center justify-between position fixed z-10 w-full top-0 transition-transform  duration-500`}
    >
      <div className="dark:text-black font-[Bebas+Neue] text-xl mr-3 md:text-3xl font-extrabold tracking-wide flex items-center ">
        <span className=" inline-block hover:rotate-[1turn]  cursor-pointer transition-all duration-700 ease-in hover:scale-150">
          🎬
        </span>
        MALIKMARTINS
        <ThemeButton />
        <NavFavouriteButton />
      </div>
      <div
        className=" min-[808px]:hidden cursor-pointer"
        onClick={handleMenuOnClick}
      >
        <img src="/menu.svg" alt="menu" />
      </div>
      <div className=" hidden min-[808px]:flex gap-5 lg:gap-10 font-bold text-xl">
        <div className="relative group">
          <NavLink to="/" end>
            {({ isActive }) => (
              <>
                <span>HOME</span>
                <div
                  className={
                    isActive
                      ? "absolute -bottom-5 w-full border-b-4 dark:border-black"
                      : "border-b-4 absolute w-0  -bottom-5 dark:border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out"
                  }
                ></div>
              </>
            )}
          </NavLink>
        </div>

        <div className="relative group">
          <NavLink to="/movies">
            {({ isActive }) => (
              <>
                <span>MOVIES</span>
                <div
                  className={
                    isActive
                      ? "absolute -bottom-5 w-full border-b-4 dark:border-black"
                      : "border-b-4 absolute w-0  -bottom-5 dark:border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out"
                  }
                ></div>
              </>
            )}
          </NavLink>
        </div>
        <div className="relative group">
          <NavLink to="/tv">
            {({ isActive }) => (
              <>
                <span>TV SHOWS</span>
                <div
                  className={
                    isActive
                      ? "absolute -bottom-5 w-full border-b-4 dark:border-black"
                      : "border-b-4 absolute w-0  -bottom-5 dark:border-black  group-hover:w-full transition-all duration-[0.4s] ease-in-out"
                  }
                ></div>
              </>
            )}
          </NavLink>
        </div>
        {user ? (
          <div className="relative group flex items-center">
            <button
              type="button"
              className="flex items-center  text-sm lg:text-lg font-normal gap-1 hover:text-gray-400 transition-colors"
            >
              <CircleUser size={22} strokeWidth={3} />
            </button>
            <span
              onClick={handleSignOut}
              className="cursor-pointer px-1 text-sm hover:text-gray-400 transition-colors"
            >
              Sign Out
            </span>
            <div className="absolute top-12 right-0 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              {user?.email}
            </div>
          </div>
        ) : (
          <button
            onClick={toggleAuth}
            className="flex items-center cursor-pointer text-sm lg:text-lg font-normal gap-1 hover:text-gray-400 transition-colors"
          >
            Sign In <User size={20} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
}
export default Navbar;
