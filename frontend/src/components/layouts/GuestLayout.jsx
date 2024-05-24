import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to='/' />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GuestLayout;
