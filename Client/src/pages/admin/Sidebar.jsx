import { ChartNoAxesColumn, SquareLibrary,Home, } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] fixed left-0 top-10 h-screen border-r border-gray-300 dark:border-gray-700 dark:bg-[#141414] p-5">
        <div className="space-y-4 mt-20">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>

          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <Home size={22} />
            <h1>Home</h1>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-[250px] sm:ml-[300px] md:p-24 p-2 dark:bg-gray-200 bg-white min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;