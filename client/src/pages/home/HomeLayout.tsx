import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styled from "styled-components";

const HomeLayout = () => {
  return (
    <WrapperLayout>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </WrapperLayout>
  );
};

export default HomeLayout;

const WrapperLayout = styled.div`
  max-height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
