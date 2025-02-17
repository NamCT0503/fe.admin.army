import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[320px] overflow-y-auto">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto pt-16 pb-4 bg-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
