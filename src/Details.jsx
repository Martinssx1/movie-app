import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Details({ mediaType = "movie" }) {
  const apikey = "7fb2198dd66a3bd9c3257d003f070a5e";
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [selectedMvideo, setSelectedMvideo] = useState(null);
  const [similar, setSimilar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function detailsData() {
      const endpoint = mediaType === "movie" ? "movie" : "tv";
      try {
        const [movieRes, videoRes, similarRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${apikey}`
          ),
          fetch(
            `https://api.themoviedb.org/3/${endpoint}/${id}/videos?api_key=${apikey}`
          ),
          fetch(
            `https://api.themoviedb.org/3/${endpoint}/${id}/similar?api_key=${apikey}`
          ),
        ]);
        const movieData = await movieRes.json();
        const videoData = await videoRes.json();
        const similarData = await similarRes.json();
        setSelectedMovies(movieData);
        setSelectedMvideo(videoData);
        setSimilar(similarData);
      } catch (err) {
        console.log("error on id", err);
      }
    }

    detailsData();
  }, [id, mediaType]);
  function onclickback() {
    navigate("/");
  }

  // Loading state - shows while data is being fetched
  if (!selectedMovies || !selectedMvideo) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  // Get the video key from the first result
  const videoKey = selectedMvideo?.results?.[0]?.key;
  const Msimilar = similar?.results;

  return (
    <div className="min-h-screen  text-orange-950">
      <div className="bg-orange-950 p-4 flex items-center ">
        <span
          className="bg-[#121212] flex items-center p-1 font-bold mr-3 cursor-pointer"
          onClick={onclickback}
        >
          <img className="w-3 md:w-7" src="/backarrow.svg" alt="backarrow" />
          Go back
        </span>

        <div className="text-black font-[Bebas+Neue] text-xl md:text-3xl  font-extrabold tracking-wide ">
          MALIKMARTINS
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          {selectedMovies.title || selectedMovies.name}
        </h1>

        {videoKey ? (
          <div className="w-full max-w-5xl mx-auto mb-10">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}`}
                title={`${
                  selectedMovies.title || selectedMovies.name
                }  Trailer`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        ) : (
          // Fallback if no trailer exists
          <div className="w-full max-w-5xl mx-auto mb-10 p-10  bg-black  rounded-xl text-center">
            <p className="text-xl text-gray-400">
              No trailer available for this movie
            </p>
          </div>
        )}

        {/* Movie Details Section */}
        <div className="max-w-5xl mx-auto text-orange-950">
          {/* Overview Section */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-4">Overview</h2>
            <p className="text-lg font-bold leading-relaxed">
              {selectedMovies.overview || "No overview available"}
            </p>
          </div>

          {/* Movie Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {/* Rating */}
            <div className=" bg-black  p-6 rounded-lg">
              <p className="text-orange-950 text-sm mb-2">Rating</p>
              <p className="text-3xl text-orange-950 font-bold">
                ⭐ {selectedMovies.vote_average.toFixed(1)}/10
              </p>
              <p className="text-orange-950 text-sm mt-1">
                ({selectedMovies.vote_count} votes)
              </p>
            </div>

            <div className=" bg-black  p-6 rounded-lg">
              <p className="text-orange-950 text-sm mb-2">Release Date</p>
              <p className="text-2xl text-orange-950 font-bold">
                {selectedMovies.release_date || "Unknown"}
              </p>
            </div>

            {selectedMovies.runtime && (
              <div className=" bg-black p-6 rounded-lg">
                <p className="text-orange-950 text-sm mb-2">Runtime</p>
                <p className="text-2xl text-orange-950 font-bold">
                  {selectedMovies.runtime} min
                </p>
              </div>
            )}
          </div>
          <div className="mt-5 text-orange-950  text-3xl font-bold">
            For you(Similar)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-5 gap-2  ">
            {/*similar */}
            {Msimilar.length > 0 ? (
              Msimilar.slice(0, 6).map((item) => (
                <div key={item.id} className="bg-black p-3 flex flex-col ">
                  <div>
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
                          : "/no-poster-image.jpg"
                      }
                      className="rounded-2xl w-full"
                      alt={item.title || item.name}
                    />
                  </div>
                  <div className="text-orange-950 text-lg ">
                    {item.title || item.name}
                    {
                      <p className="text-sm text-gray-400">
                        ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                      </p>
                    }
                  </div>
                </div>
              ))
            ) : (
              <div>Not Available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
