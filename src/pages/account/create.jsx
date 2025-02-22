import { Button, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/UserContext';
import { getAllRole } from '../../api/role';
import { getAllStorage } from '../../api/storage';
import { getAllDepartment } from '../../api/department';
import { createAccount } from '../../api/account';

const CreateAccount = () => {
  const { authState } = useAuthContext();

  const [roles, setRoles] = useState([]); // Dữ liệu tất cả role.
  const [departments, setDepartments] = useState([]); // Dữ liệu tất cả department.
  const [storages, setStorages] = useState([]); // Dữ liệu tất cả storage.
  const [dataInput, setDataInput] = useState({
    fullname: '',
    username: '',
    password: '',
    role_id: null,
    department_id: null,
    storage_id: null
  })

  useEffect(() => {
    if(authState?.user){
      const fetcherRoles = async (page, limit) => {
        const res = await getAllRole(page, limit);
        if(res?.status===200){
          const dataRes = res.metadata.records?.map(items => ({
            value: items.id,
            label: items.name
          }))
          setRoles(dataRes);
        } else alert(res.message ?? 'Lỗi lấy dữ liệu role!');
      }

      const fetcherStorage = async (page, limit) => {
        const res = await getAllStorage(page, limit);
        if(res?.status===200){
          const dataRes = res.metadata.records?.map(items => ({
            value: items.id,
            label: items.name
          }))
          setStorages(dataRes);
        } else alert(res.message ?? 'Lỗi lấy dữ liệu storage!');
      }

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

      fetcherRoles(1, 50);
      fetcherStorage(1, 50);
      fetcherDepartmetn(1, 50);
    }
  }, [authState]);

  const handleChangeInput = (e) => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value
    });
  }

  const handleChooseRole = (value) => {
    setDataInput({
      ...dataInput,
      role_id: value
    });
  }

  const handleChooseDepartment = (value) => {
    setDataInput({
      ...dataInput,
      department_id: value
    });
  }

  const handleChooseStorage = (value) => {
    setDataInput({
      ...dataInput,
      storage_id: value
    });
  }

  const handleSubmit = async () => {
    if(dataInput.fullname.trim()==='' || dataInput.username.trim()==='' || dataInput.password.trim()==='')
      return alert('Các trường đánh dấu sao đỏ không được bỏ trống!');

    const payload = Object.fromEntries(
      Object.entries(dataInput).filter(([_, value]) => value !== null)
    );
    const res = await createAccount(payload);
    if(res?.status===201){
      alert('Tạo tài khoản người dùng mới thành công!');
      window.location.href = '/danh-sach-tai-khoan';
    } else alert(res.message ?? 'Lỗi tạo tài khoản!');
  }

  return (
    <div className='container flex justify-center items-center h-full'>
      <div className='bg-white rounded-2xl flex justify-center items-center overflow-y-auto' style={{ width: '95%', height: '95%' }}>
        <div className='flex flex-col justify-start items-start gap-10' style={{ width: '95%', height: '95%' }}>
          <span className='inline-block text-3xl font-extrabold'>Thêm tài khoản mới</span>
          <div className='w-full h-fit flex flex-col justify-start items-start gap-6 text-lg'>
            <div className='w-full flex flex-col justify-start items-start gap-2'>
              <span className='inline-block'><b>Họ và tên <span className='text-red-500'>*</span></b></span>
              <Input name='fullname' value={dataInput.fullname} onChange={handleChangeInput} size='large'/>
            </div>
            <div className='w-full flex justify-between items-center'>
              <div className='flex flex-col justify-start items-start gap-2' style={{ width: '49%' }}>
                <span className='inline-block'><b>Tên tài khoản <span className='text-red-500'>*</span></b></span>
                <Input name='username' value={dataInput.username} onChange={handleChangeInput} size='large' />
              </div>
              <div className='flex flex-col justify-start items-start gap-2' style={{ width: '49%' }}>
                <span className='inline-block'><b>Mật khẩu <span className='text-red-500'>*</span></b></span>
                <Input type='password' name='password' value={dataInput.password} onChange={handleChangeInput} size='large' />
              </div>
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-2'>
              <span className='inline-block'><b>Chức vụ</b></span>
              <Select
                className='w-full'
                placeholder="Chọn chức vụ"
                options={roles}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                showSearch
                onChange={handleChooseRole}
              />
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-2'>
              <span className='inline-block'><b>Phòng ban</b></span>
              <Select
                className='w-full'
                placeholder="Chọn phòng ban"
                options={departments}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                showSearch
                onChange={handleChooseDepartment}
              />
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-2'>
              <span className='inline-block'><b>Kho</b></span>
              <Select
                className='w-full'
                placeholder="Chọn kho"
                options={storages}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                showSearch
                onChange={handleChooseStorage}
              />
            </div>
            <div className='w-full flex justify-center items-center gap-2'>
              <Button type='primary' size='large' onClick={handleSubmit}>Xác nhận</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount