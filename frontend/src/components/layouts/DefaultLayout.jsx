import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to='/account/auth/login' />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
