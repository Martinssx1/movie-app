import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { AuthContext } from "./UseAuth";

export default function ContextAuth({ children }) {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }
    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);
  function toggleAuth() {
    setShowAuth((prev) => !prev);
  }

  async function signUp(Email, Password) {
    const { data, error } = await supabase.auth.signUp({
      email: Email,
      password: Password,
    });
    return { data, error };
  }

  async function signIn(Email, Password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: Email,
      password: Password,
    });
    return { data, error };
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    return { error };
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        signUp,
        toggleAuth,
        showAuth,
        setShowAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
