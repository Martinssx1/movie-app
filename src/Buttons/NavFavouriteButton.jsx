import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavFavouriteButton() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/favorites");
  }
  return (
    <button className="ml-2 cursor-pointer" onClick={handleClick}>
      <Heart size={20} strokeWidth={2} />
    </button>
  );
}
