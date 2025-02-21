import { Button, Input, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/UserContext";
import { createSuggesstion } from "../../api/suggesstion";

const urlUploadFiles = 'http://localhost:5001/api/upload';

const CreateSuggesstion = () => {
  const { authState } = useAuthContext();
  const { user } = authState;

  const [currentDate, setCurrentDate] = useState("");
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const handleDataChange = (e) => {
    setDesc(e.target.value);
  }

  const handleUploadFiles = async ({ fileList }) => {
    setFiles(fileList.map(items => {
      return items.originFileObj;
    }))
  }

  const handleTypeImage = (file) => {
    const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    
    if(!types.includes(file.type)){
      alert('Ảnh tải lên phải có định dạng .png, .jpef, .jpg hoặc .webp');
      return Upload.LIST_IGNORE;
    }
    return false;
  }

  const handleTypeFile = (file) => {
    const types = [
      'application/pdf', // PDF
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'text/plain', // .txt
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    ];
    
    if(!types.includes(file.type)){
      alert('File tải lên phải có định dạng .pdf, .doc, .docx, .txt hoặc .xlsx');
      return Upload.LIST_IGNORE;
    }
    return false;
  }
  
  const handleCreate = async () => {
    if(desc.trim()==="") return alert("Vui lòng nhập nội dung yêu cầu!");

    const formData = new FormData();
    files.forEach(items => {
      formData.append('files', items)
    })
    try {
      const res = await fetch(urlUploadFiles, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${authState?.token}`
        }
      });

      if(res.ok){
        const dataRes = await res.json();
        if(dataRes?.status===201){
          await createSuggesstion({ description: desc, files: dataRes.metadata });
          window.location.href = '/de-nghi-nhu-cau'
        }       
      }
    } catch (error) {
      alert("Đã xảy ra lỗi trong quá trình xử lý file!");
      console.error("Lỗi upload file: ", error)
    }
  }

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
            <Input.TextArea placeholder="Nội dung" required size="large" rows={6} value={desc} onChange={handleDataChange} />
          </div>
        </div>
        <div className="w-full flex justify-start items-start gap-4">
          <span className="inline-block font-semibold">Đính kèm ảnh (nếu có):</span>
          <Upload
            className="cursor-pointer grow"
            listType="text"
            multiple
            showUploadList={{
              extra: ({ size = 0 }) => (
                <span style={{ color: '#cccccc' }}>({(size / 1024 / 1024).toFixed(2)}MB)</span>
              ),
              showDownloadIcon: true,
              downloadIcon: 'Download',
              showRemoveIcon: true
            }}
            onChange={handleUploadFiles}
            // beforeUpload={() => false}
            beforeUpload={handleTypeImage}
          >
            <i className="fa-solid fa-upload"></i>
            <span>Tải ảnh lên</span>
          </Upload>
        </div>
        <div className="w-full flex justify-start items-start gap-4">
          <span className="inline-block font-semibold">Đính kèm file (nếu có):</span>
          <Upload
            className="cursor-pointer grow"
            listType="text"
            multiple
            showUploadList={{
              extra: ({ size = 0 }) => (
                <span style={{ color: '#cccccc' }}>({(size / 1024 / 1024).toFixed(2)}MB)</span>
              ),
              showDownloadIcon: true,
              downloadIcon: 'Download',
              showRemoveIcon: true
            }}
            onChange={handleUploadFiles}
            beforeUpload={handleTypeFile}
          >
            <i className="fa-solid fa-upload"></i>
            <span>Tải file lên</span>
          </Upload>
        </div>
        <div className="flex justify-center items-center">
          <Button size="large" type="primary" onClick={handleCreate}>Gửi yêu cầu</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSuggesstion;
