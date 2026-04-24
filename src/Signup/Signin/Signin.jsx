import { useAuth } from "./UseAuth";
import { useState, useRef } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { GlobalFavourite } from "../../favourite/ContextFavourite";

export default function SignIn() {
  const { showAuth, setShowAuth, signUp, signIn } = useAuth();
  const { loadFavorite } = GlobalFavourite();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const favoriteLoadingRef = useRef(false);

  //const loadingRef = useRef(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showSignUp, setShowSignUp] = useState(false);
  async function handleSignIn() {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    favoriteLoadingRef.current = true;
    try {
      const { data, error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        setError(error.message);
        console.error("Sign in error:", error);
        return;
      }
      if (data) {
        setSuccess("Sign in successful! ");
        setShowAuth(false);
        await loadFavorite();
      }
    } finally {
      setLoading(false);
      favoriteLoadingRef.current = false;
    }
  }
  async function handleSignUp() {
    if (!email || !password) {
      setError("Please fill in all fields.");
    }
    setLoading(true);
    try {
      const { data, error } = await signUp(email, password);
      setLoading(false);
      if (error) {
        setError(error.message);
        console.error("Sign up error:", error);
        return;
      }
      if (data) {
        setSuccess("Sign up successful! ");
        setShowAuth(false);
      }
    } finally {
      setLoading(false);
      favoriteLoadingRef.current = false;
    }
  }
  function toggleSignUp() {
    setShowSignUp((prev) => !prev);
  }
  return (
    <>
      {showAuth && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowAuth(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">
              {showSignUp ? "Create an account" : "Welcome back!"}
            </h2>

            <form
              className="flex flex-col gap-2
             "
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 w-full rounded-lg  focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm mb-1">{success}</p>
              )}

              {showSignUp ? (
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSignUp}
                  className="bg-black text-white  py-2 cursor-pointer rounded-lg hover:opacity-90 transition"
                >
                  {loading ? (
                    <div className="flex justify-center ">
                      <div className="h-6 w-6 animate-spin rounded-full border-4 border-black border-t-white" />
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="bg-black text-white  py-2 cursor-pointer rounded-lg hover:opacity-90 transition"
                >
                  {loading ? (
                    <div className="flex justify-center ">
                      <div className="h-6 w-6 animate-spin rounded-full border-4 border-black border-t-white" />
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              )}
            </form>

            <p className="text-sm text-center mt-4">
              {showSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <span
                onClick={toggleSignUp}
                className="text-blue-600 underline cursor-pointer"
              >
                {showSignUp ? "Sign in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
