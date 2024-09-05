import React, { useEffect } from "react";
import { UrlState } from "@/context/context";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="hsl(125,82%,50%)" />;
  if (isAuthenticated) return <>{children}</>;
};

export default RequireAuth;
