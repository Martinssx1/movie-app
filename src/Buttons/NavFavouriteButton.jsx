import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Signup/Signin/UseAuth";

export default function NavFavouriteButton() {
  const navigate = useNavigate();
  const { user, setShowAuth } = useAuth();

  function handleClick() {
    if (!user) {
      setShowAuth(true);
    } else {
      navigate("/favorites");
    }
  }
  return (
    <button className="ml-2 cursor-pointer" onClick={handleClick}>
      <Heart size={20} strokeWidth={2} />
    </button>
  );
}
