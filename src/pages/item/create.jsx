import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/UserContext";
import { Input, Select, Button, message, notification } from "antd";
import { createItem } from "../../api/item";

const { Option } = Select;

const CreateItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState } = useAuthContext();
  const { user } = authState;

  const [type, setType] = useState({
    type: null,
    status: null,
    typeValue: null,
    statusValue: null,
  });
  const [title, setTitle] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [quantity1, setQuantity1] = useState("");
  const [quantity2, setQuantity2] = useState("");
  const [quantity3, setQuantity3] = useState("");
  const [quantity4, setQuantity4] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/vat-chat-doanh-trai-co-dinh/them-moi":
        setType({ type: "doanh-trai", status: "co-dinh", typeValue: "Doanh trại", statusValue: "Cố định" });
        setTitle("Thêm mới Vật chất Doanh trại cố định");
        break;
      case "/vat-chat-doanh-trai-cap-phat/them-moi":
        setType({ type: "doanh-trai", status: "cap-phat", typeValue: "Doanh trại", statusValue: "Cấp phát" });
        setTitle("Thêm mới Vật chất Doanh trại cấp phát");
        break;
      case "/vat-chat-quan-nhu-co-dinh/them-moi":
        setType({ type: "quan-nhu", status: "co-dinh", typeValue: "Quân nhu", statusValue: "Cố định" });
        setTitle("Thêm mới Vật chất Quân nhu cố định");
        break;
      case "/vat-chat-quan-nhu-cap-phat/them-moi":
        setType({ type: "quan-nhu", status: "cap-phat", typeValue: "Quân nhu", statusValue: "Cấp phát" });
        setTitle("Thêm mới Vật chất Quân nhu cấp phát");
        break;
      case "/vat-chat-xang-xe-co-dinh/them-moi":
        setType({ type: "xang-xe", status: "co-dinh", typeValue: "Xăng xe", statusValue: "Cố định" });
        setTitle("Thêm mới Vật chất Xăng xe cố định");
        break;
      case "/vat-chat-xang-xe-cap-phat/them-moi":
        setType({ type: "xang-xe", status: "cap-phat", typeValue: "Xăng xe", statusValue: "Cấp phát" });
        setTitle("Thêm mới Vật chất Xăng xe cấp phát");
        break;
      case "/vat-chat-quan-y-co-dinh/them-moi":
        setType({ type: "quan-y", status: "co-dinh", typeValue: "Quân y", statusValue: "Cố định" });
        setTitle("Thêm mới Vật chất Quân y cố định");
        break;
      case "/vat-chat-quan-y-cap-phat/them-moi":
        setType({ type: "quan-y", status: "cap-phat", typeValue: "Quân y", statusValue: "Cấp phát" });
        setTitle("Thêm mới Vật chất Quân y cấp phát");
        break;
      default:
        setType({ type: null, status: null, typeValue: null, statusValue: null });
        break;
    }
  }, [location.pathname]);

  const typeOptions = [
    { value: "1", label: "test 1" },
    { value: "2", label: "test 2" },
    { value: "3", label: "test 3" },
  ];

  const handleCreateItem = async () => {
    const itemData = {
      user_id: user.id,
      type: type.type,
      status: type.status,
      count_t1: parseInt(quantity1),
      count_t2: parseInt(quantity2),
      count_t3: parseInt(quantity3),
      count_t4: parseInt(quantity4),
      name: selectedType,
    };
  
    try {
      const response = await createItem(itemData);
      if (response.status === 201) {
        notification.destroy();
        notification.success({
          message: "Success",
          description: "Item created successfully!"
        });
        // Navigate to the desired route after creation
        navigate(`/vat-chat-${type.type}-${type.status}`, { replace: true });
        // Reset form after successful creation
      } else {
        message.error("Failed to create item.");
      }
    } catch (error) {
      message.error("An error occurred while creating the item.");
    }
  };  

  return (
    <div className="container relative mx-8 p-6 bg-white rounded-xl shadow-lg min-h-[100%] overflow-hidden">
      <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
      <div className="space-y-6 mt-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Tên người đăng ký <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Tên người đăng ký" value={user?.fullname} required disabled size="large" />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Phòng ban <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Phòng ban" value={user?.department?.name} required disabled size="large" />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Ngày đăng ký <span className="text-red-500">*</span>
            </label>
            <Input type="date" required size="large" value={currentDate} disabled />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Loại vật chất <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedType}
              onChange={(value) => setSelectedType(value)}
              placeholder="Chọn phân loại"
              size="large"
              className="w-full"
            >
              {typeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Phân loại <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Phân loại" value={type?.typeValue} required disabled size="large" />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Trạng thái <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Trạng thái" value={type?.statusValue} required disabled size="large" />
          </div>
        </div>
        {/* Quantity inputs */}
        {[1, 2, 3, 4].map((level) => (
          <div className="flex space-x-4" key={level}>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">
                Số lượng cấp {level} <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                placeholder={`Số lượng cấp ${level}`}
                value={eval(`quantity${level}`)}
                onChange={(e) => eval(`setQuantity${level}(e.target.value)`)}
                required
                size="large"
              />
            </div>
          </div>
        ))}
        {/* Button Create */}
        <div className="flex justify-end mt-6">
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleCreateItem}
          >
            Tạo mới
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
