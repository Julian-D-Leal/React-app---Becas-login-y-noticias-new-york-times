/** @format */

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function GPrivateRoute  ({ children})  {
  const state = useSelector((state) => state.auth);
  return (state.isAuthenticated && state.isGuest)? children : <Navigate to="/guest/login/"/>;
};

export function RPrivateRoute ({ children })  {
  const state = useSelector((state) => state.auth);
  return (state.isAuthenticated && !state.isGuest)? children : <Navigate to="/guest/login/"/>;
};

export function PrivateRoute ({ children })  {
  const state = useSelector((state) => state.auth);
  return state.isAuthenticated? children : <Navigate to="/guest/login/"/>;
};


