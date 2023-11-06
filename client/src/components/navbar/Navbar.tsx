import styled from "styled-components";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <WrapperHeader className="header">
      <a href="#">
        <img className="logo" alt="Omnifood logo" src="img/omnifood-logo.png" />
      </a>

      <NavLinks />
    </WrapperHeader>
  );
}

const WrapperHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fdf2e9;

  /* Because we want header to be sticky later */
  height: 7.6rem;
  padding: 0 4.8rem;
  .logo {
    height: 2.2rem;
  }
  .main-nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 3.2rem;
  }
`;
