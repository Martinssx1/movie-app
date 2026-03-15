import Searchskeletons from "./Searchskeletons";
import Textskeletons from "./Textskeletons";
import MovieCardSkeleton from "./Moviecardskeletons";
function Allskeletons() {
  return (
    <>
      <Searchskeletons />
      <Textskeletons />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3">
        {Array.from({ length: 20 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
export default Allskeletons;
