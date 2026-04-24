import { Link } from "react-router-dom";
import { User, CircleUser } from "lucide-react";
import { useAuth } from "../Signup/Signin/UseAuth";

function MenuButton({ menuButtonProps }) {
  const { user, toggleAuth, signOut } = useAuth();

  return (
    <div>
    
      {menuButtonProps && (
        <div className=" absolute w-full transition-all duration-300  top-0 transform translate-y-15 right-0 z-10 flex flex-col bg-black opacity-70 text-white ">
          <Link to="/">
            <div className="p-2 border-b-2 dark:border-orange-950 hover:text-gray-400  ">
              HOME
            </div>
          </Link>
          <Link to="/movies">
            <div className=" p-2 border-b-2 dark:border-orange-950 hover:text-gray-400   ">
              MOVIES
            </div>
          </Link>
          <Link to="/tv">
            <div className=" p-2 border-b-2 dark:border-orange-950 hover:text-gray-400  ">
              TV SHOWS
            </div>
          </Link>

          <div className="flex items-center  justify-center ">
            {user ? (
              <div className="flex items-center  flex-col">
                <div className="flex items-center  text-sm lg:text-lg font-normal gap-1 hover:text-gray-400 transition-colors">
                  {user.email} <CircleUser size={20} strokeWidth={3} />
                </div>
                <button
                  onClick={signOut}
                  className="cursor-pointer hover:text-gray-400 transition-colors p-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={toggleAuth}
                className="flex items-center cursor-pointer p-2 text-sm lg:text-lg font-normal gap-1 hover:text-gray-400 transition-colors"
              >
                Sign In
                <User size={20} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default MenuButton;
