import { NavLink } from "react-router-dom";
import ThemeButton from "./Theme/ThemeButton";
import { useEffect, useState, useRef } from "react";
import NavFavouriteButton from "./Buttons/NavFavouriteButton";
function Navbar({ handleMenuOnClick }) {
  const [showHeader, setShowHeader] = useState(true);
  const prevScroll = useRef(0);

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
  return (
    <div
      className={` ${showHeader ? "translate-y-0 " : "-translate-y-full "} dark:bg-orange-950  bg-white p-4 flex items-center justify-between position fixed z-10 w-full top-0 transition-transform  duration-500`}
    >
      <div className="dark:text-black font-[Bebas+Neue] text-xl md:text-3xl font-extrabold tracking-wide flex items-center ">
        <span className=" inline-block hover:rotate-[1turn]  cursor-pointer transition-all duration-700 ease-in hover:scale-150">
          🎬
        </span>
        MALIKMARTINS
        <ThemeButton />
        <NavFavouriteButton />
      </div>
      <div className=" md:hidden cursor-pointer" onClick={handleMenuOnClick}>
        <img src="/menu.svg" alt="menu" />
      </div>
      <div className=" hidden md:flex gap-10 font-bold text-xl">
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
      </div>
    </div>
  );
}
export default Navbar;
