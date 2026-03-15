import { Outlet } from "react-router-dom";
import BackHeader from "../BackHeader";
function Detailsandsearchlayout() {
  return (
    <>
      <BackHeader />
      <main className="mt-17">
        <Outlet />
      </main>
    </>
  );
}
export default Detailsandsearchlayout;
