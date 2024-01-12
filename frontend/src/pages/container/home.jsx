import React from "react";
import logoo from "./logoo.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  const text = "Trackflow";

  // Use an inline style with clip-path
  const clipPathStyle = {
    clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`, // You can customize the shape here
  };
  return (
    <div className="flex flex-row justify-between w-full h-screen bg-black/90">
      <div className="flex flex-col w-[50%] border-2 border-white rounded-md h-screen">
        <div className="flex flex-row w-full">
          <img src={logoo} className="w-14 h-auto m-5" />
          <p className=" uppercase font-sans font-bold text-xl mt-8 text-white">
            TrackFlow
          </p>
        </div>
        <div>
          <div className="w-[90%] mx-auto my-[calc(28%)]">
            <p className="text-5xl my-auto font-semibold text-white">
              Inventory management system, A tool to amplify Efficiency.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-[50%] h-screen border-white border-2 rounded-md">
        <div className="flex flex-col w-[50%] h-[50%] items-center justify-center">
          <p className="font-bold text-xl text-white">Get started</p>
          <div className="flex flex-row gap-x-3">
            <Link to="/login">
              <button className="bg-purple-700 flex mt-4 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950">
                <p className="font-semibold">Log in</p>
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-purple-700 flex mt-4 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950">
                <p className="font-semibold">Sign up</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
