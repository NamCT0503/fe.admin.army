import React from 'react';
import banner from '../assets/bv354.jpg';

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen relative flex justify-center items-center">
      <img src={banner} alt="banner" className="w-full h-full object-cover absolute top-0 left-0 -z-10" />
      <div className="z-10">{children}</div>
    </div>
  );
};

export default AuthLayout;
