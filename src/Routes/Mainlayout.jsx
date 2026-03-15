import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
function Mainlayout({ handleMenuOnClick }) {
  return (
    <>
      <Navbar handleMenuOnClick={handleMenuOnClick} />
      <main className="mt-30">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default Mainlayout;
