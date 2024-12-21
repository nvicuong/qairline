import Sidebar from "./Sidebar.jsx";
import MainDash from "./MainDash/MainDash.jsx";
import RightSide from "./RigtSide/RightSide.jsx";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
const Admin = (props) => {
  return (
    <div className="admin-container">
      <div className="admin-glass">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default Admin;
