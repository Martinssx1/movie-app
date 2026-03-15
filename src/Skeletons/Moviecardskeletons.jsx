function MovieCardSkeleton() {
  return (
    <>
      <div className="p-2 bg-black rounded mt-4">
        <div className="flex flex-col gap-3">
          {/* Poster */}
          <div className="w-full h-[300px] bg-[#121212] animate-pulse" />

          {/* Title */}
          <div className="h-4 w-3/4 bg-[#574343]  animate-pulse" />

          {/* Rating */}
          <div className="h-3 w-1/2 bg-[#121212]  animate-pulse" />
        </div>
      </div>
    </>
  );
}
export default MovieCardSkeleton;
