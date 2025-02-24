import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/UserContext';
import { deleteAccount, getAccount } from '../../api/account';
import { Col, Input, Row, Select, Table } from 'antd';
import { getAllDepartment } from '../../api/department';

const Account = () => {
  const { authState } = useAuthContext();

  const [data, setData] = useState([]); // Danh sách người dùng (bao gồm cả các tài khoản bị khóa --- xóa mềm).
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [department, setDepartment] = useState(null);
  const [nameInput, setNameInput] = useState(null);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  const fetcherDepartmetn = async (page, limit) => {
    const res = await getAllDepartment(page, limit);
    if(res?.status===200){
      const dataRes = res.metadata.records?.map(items => ({
        value: items.id,
        label: items.name
      }))
      setDepartments(dataRes);
    } else alert(res.message ?? 'Lỗi lấy dữ liệu department!');
  }

  useEffect(() => {
    setLoading(true);
    if(authState.user && authState.token && authState?.token.trim()!==''){
      const fetcher = async (page, limit, filter) => {
        const res = await getAccount(page, limit, filter);
        if(res?.status===200){
          setData(res.metadata.records);
          setPagination({
            ...pagination,
            page: res.metadata.pageCurrent,
            limit: res.metadata.recordOfPage,
            total: res.metadata.totalPage
          });
          setLoading(false);
        } else alert(res?.message ?? 'Lỗi lấy danh sách tài khoản!');
      }

      fetcher(pagination.page, pagination.limit, { is_paranoid: 0, department, name: nameInput });
    }
  }, [authState, pagination.page, department, nameInput]);

  useEffect(() => {
    if(authState?.user){
      fetcherDepartmetn(1, 50)
    }
  }, [authState]);

  const handleClickBtnLock = async (e, record) => {
    e.stopPropagation();
    const res = await deleteAccount(record?.id, true);
    if(res?.status===200){
      alert('Khóa tài khoản thành công!');
      window.location.reload();
    } else alert(res.message ?? 'Lỗi khóa tài khoản!')
  }

  const handleClickBtnUnLock = async (e, record) => {
    e.stopPropagation();
    const res = await deleteAccount(record?.id, false);
    if(res?.status===200){
      alert('Mở khóa thành công!');
      window.location.reload();
    } else alert(res.message ?? 'Lỗi mở khóa tài khoản!')
  }

  const column = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => index+1,
      width: '60px'
    },
    {
      title: 'HỌ VÀ TÊN',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text, record) => record?.fullname,
      width: '250px',
      ellipsis: true
    },
    {
      title: 'TÀI KHOẢN',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => record?.username,
      width: '180px',
      ellipsis: true
    },
    {
      title: 'CHỨC VỤ',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => record?.roles?.name,
      width: '200px',
      ellipsis: true
    },
    {
      title: 'KHOA, BAN, BỘ PHẬN',
      dataIndex: 'department_name',
      key: 'department_name',
      render: (text, record) => record?.department_name ?? 'Tạm không có',
      width: '200px',
      ellipsis: true
    },
    {
      title: 'KHO',
      dataIndex: 'storage',
      key: 'storage',
      render: (text, record) => record?.storages?.name ?? 'Tạm không có',
      with: '100px',
      ellipsis: true
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        if(authState?.user?.role_id<4){
          if(record?.deletedAt){
            return(
              <button
                className="px-4 py-1 bg-blue-600 border border-blue-700 rounded-md shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out cursor-pointer"
                onClick={(e) => handleClickBtnUnLock(e, record)}
              >
                Mở khóa
              </button>
            )
          } else {
            return(
              <button
                className="px-4 py-1 bg-red-600 border border-red-700 rounded-md shadow-sm text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out cursor-pointer"
                onClick={(e) => handleClickBtnLock(e, record)}
              >
                Khóa
              </button>
            )
          }
        }
      }
    }
  ];

  const handleClickRow = (record) => {
    navigate(`chi-tiet-tai-khoan/${record.id}`, { state: record });
  }

  return (
    <div  className="container relative mx-8 p-6 bg-white rounded-xl shadow-lg min-h-[100%] overflow-hidden flex flex-col justify-start items-center gap-3">
      {/* Phần tiêu đề và nút thêm */}
      <div class="w-full flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Danh sách tài khoản
        </h1>
        {
          authState?.user?.role_id<4?
          <Link
          to="/tai-khoan/them-moi"
          class="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Thêm tài khoản
        </Link>:
        <></>
        }
      </div>

      {/* Phần hiển thị danh sách */}
      <div className='w-full flex flex-col justify-start items-center'>
        {/* Phần lọc */}
        <Row className='w-full' gutter={[16, 16]} align="middle" style={{ marginBottom: '20px' }}>
          {/* Bộ lọc khoa, ban, bộ phận */}
          <Col span={6}>
            <label className="font-medium">Khoa, ban, bộ phận:</label>
            <Select
              className="w-full"
              placeholder="Chọn khoa, ban"
              value={department}
              options={departments}
              onChange={(value) => setDepartment(value)}
            />
          </Col>
          {/* Tìm kiếm theo fullname, username */}
          <Col span={6}>
            <label className="font-medium">Khoa, ban, bộ phận:</label>
            <Input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder='Tìm kiếm theo họ tên, tài khoản' />
          </Col>
        </Row>

        {/* Bảng danh sách tài khoản */}
        <div class="w-full overflow-x-auto">
          <Table
            columns={column}
            dataSource={data}
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
      </div>
    </div>
  )
}

export default Account