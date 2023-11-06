import styled from "styled-components";
import SideMenu from "./components/SideMenu";
import PageContent from "./components/PageContent";

export default function AdminLayout() {
  return (
    <WrapperAdminLayout>
      <SideMenu></SideMenu>
      <PageContent></PageContent>
    </WrapperAdminLayout>
  );
}

const WrapperAdminLayout = styled.div`
  flex: 1 auto;
  display: grid;
  grid-template-columns:1fr 6fr
`;
