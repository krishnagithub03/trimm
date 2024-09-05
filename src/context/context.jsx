import { getCurrUser } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";

import { createContext, useEffect, useContext, useState } from "react";

const URLContext = createContext();

const URLProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [user]);

  return (
    <URLContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </URLContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(URLContext);
};

export default URLProvider;
