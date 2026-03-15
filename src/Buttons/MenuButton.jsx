import { Link } from "react-router-dom";
function MenuButton({ menuButtonProps }) {
  return (
    <div>
      {menuButtonProps && (
        <div className=" absolute w-full  top-0 transform translate-y-15 right-0 z-10 flex flex-col bg-black opacity-70 text-white ">
          <Link to="/">
            <div className="p-2 border-b-2 dark:border-orange-950 ">HOME</div>
          </Link>
          <Link to="/movies">
            <div className=" p-2 border-b-2 dark:border-orange-950  ">
              MOVIES
            </div>
          </Link>
          <Link to="/tv">
            <div className=" p-2 border-b-2 dark:border-orange-950  ">
              TV SHOWS
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
export default MenuButton;
