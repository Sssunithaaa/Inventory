import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full border-r-[4px] w-[100%] border-black/50">
      <div className="h-[86vh] flex flex-col">
        <ul className="flex flex-col gap-y-10 items-center content-center my-auto">
          <li>
            <Link to="/home/products">
              <button className="p-5 bg-[#0e0530] w-[22vh] rounded-xl font-sans font-bold text-white shadow-lg shadow-black lg:w-[30vh]">
                PRODUCTS
              </button>
            </Link>
          </li>
          <li>
            <Link to="/home/categories">
              <button className="p-5 bg-[#0e0530] w-[22vh] rounded-xl font-sans font-bold text-white shadow-lg shadow-black lg:w-[30vh]">
                CATEGORIES
              </button>
            </Link>
          </li>
          <li>
            <Link to="/home/clients">
              <button className="p-5 bg-[#0e0530] w-[22vh] rounded-xl font-sans font-bold text-white shadow-lg shadow-black lg:w-[30vh]">
                CLIENTS
              </button>
            </Link>
          </li>
          <li>
            <Link to="/home/suppliers">
              <button className="p-5 bg-[#0e0530] w-[22vh] rounded-xl font-sans font-bold text-white shadow-lg shadow-black lg:w-[30vh]">
                SUPPLIERS
              </button>
            </Link>
          </li>
          <li>
            <Link to="/home/transactions">
              <button className="p-5 bg-[#0e0530] w-[22vh] rounded-xl font-sans font-bold text-white shadow-lg shadow-black lg:w-[30vh]">
                TRANSACTIONS
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
