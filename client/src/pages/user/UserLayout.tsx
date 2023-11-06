import { Tabs } from "antd";
import styled from "styled-components";
import History from './components/History';
import Password from "./components/Password";

const UserLayout = () => {
  return (
    <Tabs
      tabPosition={"left"}
      items={[
        {
          label: <TitleTabs>History</TitleTabs>,
          key: "1",
          children: <History/>,
        },
        {
          label: <TitleTabs>Password</TitleTabs>,
          key: "2",
          children: <Password/>,
        },
        {
          label: <TitleTabs>Wishlist</TitleTabs>,
          key: "3",
          children: "Wishlist",
        },
      ]}
    />
  );
};

export default UserLayout;

const TitleTabs = styled.div``;
