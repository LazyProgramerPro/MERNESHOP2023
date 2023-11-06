import { FaWpforms } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";

const links = [
  { text: "Home", path: ".", icon: <FaWpforms /> },
  { text: "Login", path: "/login", icon: <MdQueryStats /> },
  { text: "Register", path: "/register", icon: <IoBarChartSharp /> },
];

export default links;
