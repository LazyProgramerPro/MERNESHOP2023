import {
  AppstoreOutlined,
  ShopOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/admin/dashboard");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (

      <Menu
      style={{  padding: "12px"}}
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/admin/dashboard",
          },
          {
            label: "Category",
            key: "/admin/category",
            icon: <ShopOutlined />,
          },
          {
            label: "Sub Category",
            key: "/admin/sub-category",
            icon: <ShopOutlined />,
          },
          {
            label: "Product",
            key: "/admin/product",
            icon: <ShopOutlined />,
          },

        ]}
      ></Menu>

  );
}
export default SideMenu;