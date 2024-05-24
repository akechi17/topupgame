import React from "react";

const AuthHeader = ({ title, subtitle, description }) => {
  return (
    <>
      <img src='' alt='' />
      <h1 className='text-green-500 uppercase font-semibold text-xl tracking-widest'>
        {title}
      </h1>
      <h1 className='text-sky-950 capitalize font-bold text-6xl'>{subtitle}</h1>
      <p className='text-slate-600 text-base'>{description}</p>
    </>
  );
};

export default AuthHeader;
