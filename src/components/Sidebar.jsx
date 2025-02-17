import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({ material: false, account: false });

  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/dang-nhap");
  };

  return (
    <div className="h-screen w-80 bg-sky-900 flex flex-col z-10">
      <ul className="py-8 mt-16 px-8 flex flex-col flex-grow">
        {/* Đề nghị, nhu cầu */}
        <li className="w-full text-white font-bold uppercase mb-4">
          <Link to="/de-nghi-nhu-cau" className="block w-full py-2 hover:bg-sky-800 hover:pl-3 duration-150">
            Đề nghị, nhu cầu
          </Link>
        </li>

        {/* Quản lý vật chất */}
        <li className="w-full text-white font-bold uppercase mb-4">
          <button
            onClick={() => toggleMenu("material")}
            className="flex justify-between items-center w-full py-2 text-left hover:bg-sky-800 hover:pl-3 duration-150 uppercase"
          >
            Quản lý vật chất
            {openMenus.material ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openMenus.material ? "max-h-96" : "max-h-0"}`}>
            <ul className="ml-4 mt-2 text-sm">
              {["Doanh trại", "Quân nhu", "Xăng xe", "Quân y"].map((item) => (
                <li key={item} className="mb-2">
                  <button
                    onClick={() => toggleMenu(item)}
                    className="flex justify-between items-center w-full py-2 text-left hover:bg-sky-700 duration-150 uppercase"
                  >
                    {item}
                    {openMenus[item] ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openMenus[item] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="ml-4 mt-2">
                      <li className="mb-1">
                        <Link
                          to={`/vat-chat-${removeVietnameseTones(item)}-co-dinh`}
                          className="block py-1 hover:text-gray-300"
                        >
                          Tài sản cố định
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/vat-chat-${removeVietnameseTones(item)}-cap-phat`}
                          className="block py-1 hover:text-gray-300"
                        >
                          Cấp, phát, nhận vật chất
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>

        {/* Quản lý tài khoản */}
        <li className="w-full text-white font-bold uppercase mb-4">
          <button
            onClick={() => toggleMenu("account")}
            className="flex justify-between items-center w-full py-2 text-left hover:bg-sky-800 hover:pl-3 duration-150 uppercase"
          >
            Quản lý tài khoản
            {openMenus.account ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openMenus.account ? "max-h-40" : "max-h-0"}`}>
            <ul className="ml-4 mt-2 text-sm">
              <li className="mb-2">
                <Link to="/danh-sach-tai-khoan" className="block py-2 hover:text-gray-300">
                  Danh sách
                </Link>
              </li>
              <li>
                <Link to="/doi-mat-khau" className="block py-2 hover:text-gray-300">
                  Đổi mật khẩu
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Đăng xuất */}
        <li className="mt-auto w-full text-white font-bold uppercase">
          <button
            onClick={handleLogout}
            className="block w-full text-left py-2 hover:bg-sky-800 hover:pl-3 duration-150 cursor-pointer"
          >
            Đăng Xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
