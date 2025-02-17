import React from "react";
import { BellIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="fixed z-20 bg-[#FEF46A] w-full flex justify-between items-center px-10 gap-4 py-2">
      <div className="flex flex-row items-center gap-4">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <div className="text-red-500">
          HỆ THỐNG QUẢN LÝ HẬU CẦN | BỆNH VIỆN QUÂN Y 354
        </div>
      </div>
      <div className="relative flex items-center gap-2">
        <h3 className="text-red-500">Thông báo chỉ đạo</h3>
        <button id="notificationButton" className="text-red-500 relative">
          <BellIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
