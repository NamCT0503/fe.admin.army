import React from 'react'
import { Link } from 'react-router-dom'

const Account = () => {
  return (
    <div  className="container relative mx-8 p-6 bg-white rounded-xl shadow-lg min-h-[100%] overflow-hidden">
      <div class="w-full flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Danh sách tài khoản
        </h1>
        <Link
          to="/tai-khoan/them-moi"
          class="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Thêm tài khoản
        </Link>
      </div>
    </div>
  )
}

export default Account