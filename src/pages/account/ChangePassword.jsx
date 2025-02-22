import { Button, Input } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import React, { useState } from 'react'
import { updateAccount } from '../../api/account';

const ChangePassword = () => {
  const [dataInput, setDataInput] = useState({
    current_pass: '',
    new_pass: '',
    confirm_pass: ''
  });
  const [isShowPass, setIsShowPass] = useState({
    current: true,
    new: true,
    confirm: true
  })

  const handleChange = (e) => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value
    });
  }

  const handelSubmit = async () => {
    if(dataInput.current_pass.trim()==='' || dataInput.new_pass.trim()==='' || dataInput.confirm_pass.trim()==='')
      return alert('Vui lòng điền đầy đủ các trường!');

    const res = await updateAccount(0, dataInput);
    if(res?.status===200){
      alert('Đổi mật khẩu thành công!');
      window.location.href = '/de-nghi-nhu-cau';
    } else alert(res.message ?? 'Lỗi đổi mật khẩu!');
  }

  return (
    <div className='container flex justify-center items-center h-full'>
      <div className='bg-white rounded-2xl flex justify-center items-center overflow-y-auto' style={{ width: '95%', height: '95%' }}>
        <div className='flex flex-col justify-start items-start gap-10' style={{ width: '95%', height: '95%' }}>
          <span className='inline-block text-3xl font-extrabold'>Đổi mật khẩu</span>
          <div className='w-full flex flex-col justify-start items-center gap-8 text-lg'>
            <div className='w-full flex flex-col justify-start items-start gap-3 relative'>
              <span><b>Mật khẩu hiện tại <span className='text-red-500'>*</span></b></span>
              <Input name='current_pass' type={isShowPass.current? 'password': 'text'} value={dataInput.current_pass} onChange={handleChange} size='large' />
              {
                isShowPass.current?
                <EyeInvisibleOutlined className='absolute right-2' style={{ top: '50%', transform: 'translateY(50%)' }} onClick={() => setIsShowPass({ ...isShowPass, current: false })} />:
                <EyeOutlined className='absolute right-2' style={{ top: '50%', transform: 'translateY(50%)' }} onClick={() => setIsShowPass({ ...isShowPass, current: true })} />
              }
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-3 relative'>
              <span><b>Mật khẩu mới <span className='text-red-500'>*</span></b></span>
              <Input name='new_pass' type={isShowPass.new? 'password': 'text'} value={dataInput.new_pass} onChange={handleChange} size='large'  />
              {
                isShowPass.new?
                <EyeInvisibleOutlined className='absolute right-2' style={{ top: '50%', transform: 'translateY(50%)' }} onClick={() => setIsShowPass({ ...isShowPass, new: false })} />:
                <EyeOutlined className='absolute right-2' style={{ top: '50%', transform: 'translateY(50%)' }} onClick={() => setIsShowPass({ ...isShowPass, new: true })} />
              }
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-3 relative'>
              <span><b>Xác nhận mật khẩu mới <span className='text-red-500'>*</span></b></span>
              <Input name='confirm_pass' type={isShowPass.confirm? 'password': 'text'} value={dataInput.confirm_pass} onChange={handleChange} size='large' />
              {
                isShowPass.confirm?
                <EyeInvisibleOutlined className='absolute right-2' style={{ top: '50%', transform: 'translateY(50%)' }} onClick={() => setIsShowPass({ ...isShowPass, confirm: false })} />:
                <EyeOutlined className='absolute right-2' style={{ top: '50%', transform: 'translateY(50%)' }} onClick={() => setIsShowPass({ ...isShowPass, confirm: true })} />
              }
            </div>
          </div>
          <div className='w-full flex justify-center items-center'>
            <Button type='primary' size='large' onClick={handelSubmit}>Xác nhận</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword