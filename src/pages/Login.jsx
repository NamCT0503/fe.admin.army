import React, { useEffect, useState } from "react";
import { UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid"; // Thêm uuid
import logo from "../assets/logo.png";
import { login } from "../actions/AuthAction";
import { useAuthContext } from "../contexts/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const getDeviceFinger = () => {
    let deviceFinger = localStorage.getItem("deviceFinger");
    if (!deviceFinger) {
      deviceFinger = uuidv4(); // Tạo deviceFinger mới nếu chưa có
      localStorage.setItem("deviceFinger", deviceFinger);
    }
    return deviceFinger;
  };

  const onFinish = async () => {
    const deviceFinger = getDeviceFinger();
    try {
      await login(dispatch, { username, password, device_finger: deviceFinger }); // Truyền deviceFinger vào login
    } catch (err) {
      console.error("Login failed:", err.message);
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300">
      <div className="flex gap-4 border-b border-gray-300 pb-4 mb-4">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <div className="mt-4">
          <h3 className="text-blue-600 font-bold text-xl">BỆNH VIỆN QUÂN Y 354</h3>
          <h3 className="text-red-600 font-bold text-lg">PHẦN MỀM QUẢN LÝ HẬU CẦN</h3>
        </div>
      </div>
      <div className="flex">
        <div className="border-r border-gray-300 pr-4 mr-4">
          <h3 className="font-bold text-red-500 mb-2">Hỗ trợ kỹ thuật</h3>
          <p className="text-sm">SĐT Trực ban: 0383065274</p>
          <p className="text-sm pt-2">SĐT Trực kỹ thuật: 0383065274</p>
          <p className="text-sm flex items-center gap-1 pt-4">
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-green-500 rotate-90" />
            Tài liệu hướng dẫn sử dụng
          </p>
        </div>
        <div className="flex-1">
          <h3 className="flex items-center text-red-500 font-bold text-lg mb-4">
            <UserCircleIcon className="w-7 h-7 mr-2" />
            Đồng chí nhập thông tin
          </h3>
          <div className="mb-4">
            <Input
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2"
              size="large"
            />
          </div>
          <div className="mb-4">
            <Input.Password
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button type="primary" onClick={onFinish} block size="large">
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
