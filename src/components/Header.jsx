import React, { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import { Badge } from "antd";
import { useNoti } from "../contexts/NotiContext";
import ViewNotiJSX from "./ViewNoti";
import { useStateContext } from "../contexts/StateContext";

const Header = () => {
  const notiContext = useNoti();
  const stateContext = useStateContext();

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(notiContext.noti.no_read);
  }, [notiContext])

  const handleClickBellNoti = () => {
    if(stateContext.state.isShowViewNoti){
      stateContext.dispatch({ type: 'CLOSE_VIEW_NOTI' });
    } else stateContext.dispatch({ type: 'OPEN_VIEW_NOTI' });
  }

  return (
    <header className="fixed z-20 bg-[#FEF46A] w-full flex justify-between items-center px-10 gap-4 py-2">
      <div className="flex flex-row items-center gap-4">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <div className="text-red-500">
          HỆ THỐNG QUẢN LÝ HẬU CẦN | BỆNH VIỆN QUÂN Y 354
        </div>
      </div>
      <div className="relative flex items-center gap-2 cursor-pointer" style={{ border: '1px solid blue' }} onClick={handleClickBellNoti}>
        <h3 className="text-red-500">Thông báo chỉ đạo</h3>
        <button id="notificationButton" className="text-red-500 relative">
          <Badge count={count} overflowCount={10}>
            <BellIcon className="w-6 h-6" />
          </Badge>
        </button>
        <ViewNotiJSX open={stateContext.state.isShowViewNoti} />
      </div>
    </header>
  );
};

export default Header;
