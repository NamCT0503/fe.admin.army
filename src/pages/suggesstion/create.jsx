import { Input } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/UserContext";

const CreateSuggesstion = () => {
  const { authState } = useAuthContext();
  const { user } = authState;

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="container relative mx-8 p-6 bg-white rounded-xl shadow-lg min-h-[100%]">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Thêm Đề Nghị, Nhu Cầu</h1>
        <Link
          to="/de-nghi-nhu-cau"
          className="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Danh sách
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4">
          {/* Input Tên người đăng ký */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">Tên người đăng ký <span className="text-red-500">*</span></label>
            <Input placeholder="Tên người đăng ký" value={user?.fullname} required disabled size="large" />
          </div>

          {/* Input Ngày đăng ký */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">Ngày đăng ký <span className="text-red-500">*</span></label>
            <Input type="date" value={currentDate} required disabled size="large" />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">Khoa, Ban, Bộ phận <span className="text-red-500">*</span></label>
            <Input placeholder="Phòng ban" required size="large" value={user?.department?.name} disabled />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">Nội dung <span className="text-red-500">*</span></label>
            <Input.TextArea placeholder="Nội dung" required size="large" rows={6} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSuggesstion;
