/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../../firebase";
import { logOut } from "../../pages/auth/redux/user.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import links from "../../helpers/links";
import { Button, Dropdown } from "antd";
import { useSelector } from "react-redux";

export default function NavLinks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  // Sủ dụng điều kiện để render navigate

  const logout = () => {
    console.log("DKM");
    auth.signOut();
    dispatch(logOut(null));
    navigate("/login");
  };

  const handleChangeLayout = () => {
    navigate("/admin/dashboard");
  };

  const items = [
    {
      key: "2",
      label:
        user && user.token ? (
          <div onClick={handleChangeLayout}>Dashboard</div>
        ) : null,
    },
    {
      key: "3",
      label: <div onClick={logout}>Logout</div>,
    },
  ];

  return (
    <MainNav className="main-nav">
      <ul className="main-nav-list">
        {links.map((link) => {
          const { text, path, icon } = link;

          return (
            <li className="list-item" key={text}>
              <NavLink to={path} key={text} className="main-nav-link" end>
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            </li>
          );
        })}
        <li className="list-item">
          {" "}
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Button>Thường Dev</Button>
          </Dropdown>
        </li>
      </ul>
    </MainNav>
  );
}

const MainNav = styled.nav`
  .main-nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 3.2rem;
  }

  .main-nav-link:link,
  .main-nav-link:visited {
    display: inline-block;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 1.8rem;
    transition: all 0.3s;
  }

  .main-nav-link:hover,
  .main-nav-link:active {
    color: #cf711f;
  }

  .main-nav-link.nav-cta:link,
  .main-nav-link.nav-cta:visited {
    padding: 1.2rem 2.4rem;
    border-radius: 9px;
    color: #fff;
    background-color: #e67e22;
  }

  .main-nav-link.nav-cta:hover,
  .main-nav-link.nav-cta:active {
    background-color: #cf711f;
  }

  .list-item {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }
`;
