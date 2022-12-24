/** @format */

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute ({children}) {
  const state = useSelector((state) => state.auth);
  return !state.isAuthenticated? children :<Navigate to="/"/>
}
