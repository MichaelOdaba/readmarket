import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <section className="container section">
      <Outlet />
    </section>
  );
};

export default DashBoard;
