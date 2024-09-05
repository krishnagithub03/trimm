import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        {/* header */}
        <Header />
        {/* body */}
        <Outlet />
      </main>
      {/* footer */}
      <div className="p-10 bg-[#1d1e21] text-center mt-10">
        Made With 💖 by KrishCodes
      </div>
    </div>
  );
};

export default AppLayout;
