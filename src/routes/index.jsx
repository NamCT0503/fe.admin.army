import { Layout } from "antd";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Account from "../pages/account";
import ChangePassword from "../pages/account/ChangePassword";
import Item from "../pages/item";
import Login from "../pages/Login";
import Suggesstion from "../pages/suggesstion";
import CreateSuggesstion from "../pages/suggesstion/create";
import CreateItem from "../pages/item/create";
import CreateAccount from "../pages/account/create";
import DetailSuggesstionJSX from "../pages/suggesstion/detail";

const routes = [
    {
        path: "/dang-nhap",
        Component: Login,
        Layout: AuthLayout,
    },
    {
        path: "/de-nghi-nhu-cau",
        Component: Suggesstion,
        Layout: MainLayout,
    },
    {
        path: '/de-nghi-nhu-cau/chi-tiet-de-nghi/*',
        Component: DetailSuggesstionJSX,
        Layout: MainLayout
    },
    {
        path: "/de-nghi-nhu-cau/them-moi",
        Component: CreateSuggesstion,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-doanh-trai-co-dinh",
        Component: Item,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-doanh-trai-cap-phat",
        Component: Item,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-quan-nhu-co-dinh",
        Component: Item,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-quan-nhu-cap-phat",
        Component: Item,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-xang-xe-co-dinh",
        Component: Item,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-xang-xe-cap-phat",
        Component: Item,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-quan-y-co-dinh",
        Component: Item,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-quan-y-cap-phat",
        Component: Item,
        Layout: MainLayout,
    },
    {
        path: "/danh-sach-tai-khoan",
        Component: Account,
        Layout: MainLayout,
    },
    {
        path: "/doi-mat-khau",
        Component: ChangePassword,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-doanh-trai-co-dinh/them-moi",
        Component: CreateItem,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-doanh-trai-cap-phat/them-moi",
        Component: CreateItem,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-quan-nhu-co-dinh/them-moi",
        Component: CreateItem,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-quan-nhu-cap-phat/them-moi",
        Component: CreateItem,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-xang-xe-co-dinh/them-moi",
        Component: CreateItem,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-xang-xe-cap-phat/them-moi",
        Component: CreateItem,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-quan-y-co-dinh/them-moi",
        Component: CreateItem,
        Layout: MainLayout,
    },
    {
        path: "/vat-chat-quan-y-cap-phat/them-moi",
        Component: CreateItem,
        Layout: MainLayout,
    },
    {
        path: "/tai-khoan/them-moi",
        Component: CreateAccount,
        Layout: MainLayout,
    }
]

export default routes;