import React, { useEffect, useState } from "react";
import { getSuggesstion } from "../../api/suggesstion";
import { Table, DatePicker, Select, Button, Row, Col } from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/UserContext";
import { useStateContext } from "../../contexts/StateContext";
import QuickMessage from "../../components/quick-message";
import { getListMessage } from "../../api/message";

const { RangePicker } = DatePicker;

const Suggesstion = () => {
  const [suggesstion, setSuggesstion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [department, setDepartment] = useState(null);
  const [status, setStatus] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [message, setMessage] = useState([]);
  const [chatCurrent, setChatCurrent] = useState();

  const navigate = useNavigate();
  const stateContext = useStateContext();
  const { authState } = useAuthContext();
  const { user } = authState;

  const fetchSuggesstion = async () => {
    setLoading(true);
    try {
      const res = await getSuggesstion(pagination.page, pagination.limit, {
        startDate,
        endDate,
        department,
        status,
      });
      if (res.status === 200) {
        setSuggesstion(res.metadata.records);
        setPagination({ ...pagination, total: res.data.total });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSuggesstion();
    document.title = "Đề nghị, nhu cầu";
  }, [pagination.page, startDate, endDate, department, status]);

  useEffect(() => {
    setIsOpen(stateContext.state.isOpenQuickMessage);
  }, [stateContext.state])

  const getMessages = async (suggesstion_id, limit, page) => {
    const res = await getListMessage(suggesstion_id, limit, page);
    if(res.status && res.status===200){
      setMessage(res.metadata.records);
    }
  }

  const handleEdit = (e, record) => {
    setLoadingMessage(true);
    e.stopPropagation();
    console.log(record);
    setChatCurrent(record);
    getMessages(record.id, 10, 1);
    stateContext.dispatch({ type: 'OPEN_QUICK_MESSAGE' })
    setLoadingMessage(false);
  };

  const handleDelete = (e, record) => {
    e.stopPropagation();
    console.log(record);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN"); // Output: "12/02/2025"
  };

  const column = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: '60px'
    },
    {
      title: "NGÀY",
      dataIndex: "date",
      key: "date",
      render: (text, record) => formatDate(record?.date),
      width: '120px'
    },
    {
      title: "KHOA, BAN, BỘ PHẬN",
      dataIndex: "department",
      key: "department",
      render: (text, record) => record?.department?.name,
      width: '180px',
      ellipsis: true
    },
    {
      title: "TÊN NGƯỜI ĐĂNG KÝ",
      dataIndex: "name",
      key: "name",
      render: (text, record) => record?.users?.fullname,
      width: '180px',
      ellipsis: true
    },
    {
      title: "NỘI DUNG",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: '200px'
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        if (record.status == 1) {
          return <span className="text-red-600 bg-red-100 font-bold py-1 px-2 rounded">Chưa xử lý</span>;
        } else if (record.status == 2) {
          return <span className="text-yellow-600 bg-yellow-100 font-bold py-1 px-2 rounded">Đang xử lý</span>;
        } else {
          return <span className="text-green-600 bg-green-100 font-bold py-1 px-2 rounded">Đã xử lý</span>;
        }
      },
    },
    {
      title: "GHI CHÚ",
      dataIndex: "note",
      key: "note",
      width: '150px',
      ellipsis: true
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return(
          <div className="flex justify-center space-x-2">
            <button
              onClick={(e) => handleDelete(e, record)}
              className="px-4 py-1 bg-red-600 border border-red-700 rounded-md shadow-sm text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out cursor-pointer"
            >
              Xóa
            </button>
            <button
              onClick={(e) => handleEdit(e, record)}
              className="px-4 py-1 bg-blue-600 border border-blue-700 rounded-md shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out cursor-pointer"
            >
              Nhắn tin
            </button>
          </div>
        )
        // if (user?.role_id < 4) {
        //   return (
        //     <div className="flex justify-center space-x-2">
        //       <button
        //         onClick={(e) => handleDelete(e, record)}
        //         className="px-4 py-1 bg-red-600 border border-red-700 rounded-md shadow-sm text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out cursor-pointer"
        //       >
        //         Xóa
        //       </button>
        //       <button
        //         onClick={(e) => handleEdit(e, record)}
        //         className="px-4 py-1 bg-blue-600 border border-blue-700 rounded-md shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out cursor-pointer"
        //       >
        //         Nhắn tin
        //       </button>
        //     </div>
        //   );
        // }
        // return null; // Nếu role_id không hợp lệ thì không render gì cả
      },
    },
  ];

  const handleClickRow = (record) => {
    navigate(`chi-tiet-de-nghi/${record.id}`, { state: record });
  }

  return (
    <div className="container relative mx-8 p-6 bg-white rounded-xl shadow-lg min-h-[100%] overflow-hidden">
      <div class="w-full flex justify-between items-center mb-6">
        <h1 class="text-3xl font-extrabold text-gray-800">Danh Sách Đề Nghị, Nhu Cầu</h1>
        <Link
          to="/de-nghi-nhu-cau/them-moi"
          class="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Thêm yêu cầu
        </Link>
      </div>

      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: '20px' }}>
      {/* Bộ lọc ngày */}
      <Col span={6}>
        <label className="font-medium">Từ ngày:</label>
        <DatePicker
          className="w-full"
          format="DD/MM/YYYY"
          value={startDate ? moment(startDate) : null}
          onChange={(date) => setStartDate(date ? date.format("YYYY-MM-DD") : null)}
        />
      </Col>
      <Col span={6}>
        <label className="font-medium">Đến ngày:</label>
        <DatePicker
          className="w-full"
          format="DD/MM/YYYY"
          value={endDate ? moment(endDate) : null}
          onChange={(date) => setEndDate(date ? date.format("YYYY-MM-DD") : null)}
        />
      </Col>

      {/* Bộ lọc khoa, ban, bộ phận */}
      <Col span={6}>
        <label className="font-medium">Khoa, ban:</label>
        <Select
          className="w-full"
          placeholder="Chọn khoa, ban"
          value={department}
          onChange={(value) => setDepartment(value)}
        >
          <Select.Option value="">Tất cả</Select.Option>
          <Select.Option value="1">Khoa Nội</Select.Option>
          <Select.Option value="2">Khoa Ngoại</Select.Option>
          <Select.Option value="3">Khoa Cấp cứu</Select.Option>
        </Select>
      </Col>

      {/* Bộ lọc trạng thái */}
      <Col span={6}>
        <label className="font-medium">Trạng thái:</label>
        <Select
          className="w-full"
          placeholder="Chọn trạng thái"
          value={status}
          onChange={(value) => setStatus(value)}
        >
          <Select.Option value="">Tất cả</Select.Option>
          <Select.Option value="1">Chưa xử lý</Select.Option>
          <Select.Option value="2">Đang xử lý</Select.Option>
          <Select.Option value="3">Đã xử lý</Select.Option>
        </Select>
      </Col>

    </Row>

      <div class="w-full overflow-x-auto">
        <Table
          columns={column}
          dataSource={suggesstion}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            onChange: (page) => setPagination({ ...pagination, page }),
          }}
          onRow={
            item => ({
              onClick: () => handleClickRow(item)
            })
          }
          loading={loading}
        />
      </div>
      <QuickMessage loading={loadingMessage} data={chatCurrent} message={message} />
    </div>
  );
};

export default Suggesstion;
