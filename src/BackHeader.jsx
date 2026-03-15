import { useNavigate } from "react-router-dom";
import ThemeButton from "./Theme/ThemeButton";
import { useEffect, useRef, useState } from "react";
export default function BackHeader() {
  const [showHeader, setShowHeader] = useState(true);
  const prevScroll = useRef(0);

  const navigate = useNavigate();
  function onclickback() {
    navigate(-1);
  }

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
      className={` ${showHeader ? "translate-y-0 " : "-translate-y-full "} dark:bg-orange-950  bg-white p-4 flex items-center position fixed z-10 w-full top-0 transition-transform  duration-500`}
    >
      <span
        className="dark:bg-[#121212]  bg-gray-900 text-white dark:text-orange-950 flex items-center p-1 font-bold mr-3 cursor-pointer"
        onClick={onclickback}
      >
        <img className="w-3 md:w-7" src="/backarrow.svg" alt="backarrow" />
        Go back
      </span>

      <div className="dark:text-black font-[Bebas+Neue] text-xl md:text-3xl  font-extrabold tracking-wide ">
        MALIKMARTINS
      </div>
      <ThemeButton />
    </div>
  );
}
