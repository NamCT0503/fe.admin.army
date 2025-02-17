import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getItem } from "../../api/item";
import { Table } from "antd";

const Item = () => {
  const [pathname, setPathname] = useState("");
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [filter, setFilter] = useState({
    type: null,
    status: null,
  });

  useEffect(() => {
    switch (location.pathname) {
      case "/vat-chat-doanh-trai-co-dinh":
        setPathname("Danh sách vật chất doanh trại cố định");
        setFilter({ type: "doanh-trai", status: "co-dinh" });
        break;
      case "/vat-chat-doanh-trai-cap-phat":
        setPathname("Danh sách vật chất doanh trại cấp phát");
        setFilter({ type: "doanh-trai", status: "cap-phat" });
        break;
      case "/vat-chat-quan-nhu-co-dinh":
        setPathname("Danh sách vật chất quân nhu cố định");
        setFilter({ type: "quan-nhu", status: "co-dinh" });
        break;
      case "/vat-chat-quan-nhu-cap-phat":
        setPathname("Danh sách vật chất quân nhu cấp phát");
        setFilter({ type: "quan-nhu", status: "cap-phat" });
        break;
      case "/vat-chat-xang-xe-co-dinh":
        setPathname("Danh sách vật chất xăng xe cố định");
        setFilter({ type: "xang-xe", status: "co-dinh" });
        break;
      case "/vat-chat-xang-xe-cap-phat":
        setPathname("Danh sách vật chất xăng xe cấp phát");
        setFilter({ type: "xang-xe", status: "cap-phat" });
        break;
      case "/vat-chat-quan-y-co-dinh":
        setPathname("Danh sách vật chất quân y cố định");
        setFilter({ type: "quan-y", status: "co-dinh" });
        break;
      case "/vat-chat-quan-y-cap-phat":
        setPathname("Danh sách vật chất quân y cấp phát");
        setFilter({ type: "quan-y", status: "cap-phat" });
        break;
      default:
        setPathname("Danh sách không xác định");
        setFilter({ type: null, status: null });
        break;
    }
  }, [location.pathname]);

  const fetchItem = async () => {
    setLoading(true);
    try {
      const res = await getItem(pagination.page, pagination.limit, filter);
      if (res.status === 200) {
        setItems(res.metadata.records);
        setPagination({ ...pagination, total: res.metadata.totalItem });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItem();
    document.title = pathname;
  }, [pagination.page, filter]);

  const column = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khoa, Ban, Bộ phận",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "SL",
      key: "total",
      render: (text, record) => record?.count_t1 + record?.count_t2 + record?.count_t3 + record?.count_t4,
    },
    {
      title: "Cấp 1",
      dataIndex: "count_t1",
      key: "count_t1",
    },
    {
      title: "Cấp 2",
      dataIndex: "count_t2",
      key: "count_t2",
    },
    {
      title: "Cấp 3",
      dataIndex: "count_t3",
      key: "count_t3",
    },
    {
      title: "Cấp 4",
      dataIndex: "count_t4",
      key: "count_t4",
    },
    {
      title: "Ngày thêm",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div className="container relative mx-8 p-6 bg-white rounded-xl shadow-lg min-h-[100%] overflow-hidden">
      <div class="w-full flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">{pathname}</h1>
        <Link
          to={`${location.pathname}/them-moi`}
          class="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Thêm mới
        </Link>
      </div>
      <div class="w-full overflow-x-auto mt-6">
        <Table
          columns={column}
          dataSource={items}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            onChange: (page) => setPagination({ ...pagination, page }),
          }}
          loading={loading}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

export default Item;
