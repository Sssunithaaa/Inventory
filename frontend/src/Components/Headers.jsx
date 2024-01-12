import React from "react";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiSmileyWinkDuotone } from "react-icons/pi";
import { FaHandPointRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
const NavItemInfo = [
  {
    name: "Pages",
    type: "dropdown",
    items: ["Suppilers", "Products", "Transactions", "Categories"],
  },
];
const NavItem = ({ item }) => {
  const [dropdown, setDropDown] = useState(false);
  const toggleDrop = () => {
    setDropDown((curState) => {
      return !curState;
    });
  };

  return (
    <div>
      <li className=" px-4 py-2 relative group ">
        {item.type === "link" ? (
          <div className="mx-auto">
            <a
              href="/"
              className={` cursor-pointer rounded-lg px-8 py-2 text-lg  hover:bg-gray-400 hover:rounded-full `}
            >
              {item.name}
            </a>
            <span className="text-white-500 absolute transition-all duration-500 font-semibold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
              <PiSmileyWinkDuotone />
              <FaHandPointRight />
            </span>
          </div>
        ) : (
          <div
            className={`${
              dropdown ? " rounded-none  hover:rounded-none" : ""
            } lg:hidden px-3 py-1 mx-auto flex flex-col items-center ${
              !dropdown ? "hover:bg-gray-400" : ""
            }  hover:rounded-full`}
          >
            <button
              href="/"
              className={`${
                dropdown ? "bg-white" : ""
              } rounded-lg flex gap-x-1 px-4 py-1 text-lg items-center `}
              onClick={toggleDrop}
            >
              <span>{item.name}</span>
              <IoIosArrowDown />
            </button>
            <div
              className={`${
                dropdown ? "block " : "hidden"
              } z-[1000]  rounded-none transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 transform lg:translate-y-full lg:group-hover:block w-max h-max`}
            >
              <ul className="flex flex-col shadow-lg rounded-lg overflow-hidden">
                {item.items.map((page) => (
                  <a
                    href="/"
                    className="hover:bg-dgreen hover:text-white px-4 py-2 lg:text-dgreen"
                  >
                    {page}
                  </a>
                ))}
              </ul>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};
const Headers = () => {
  const [naVisible, setNavisible] = useState(false);
  const naVisibilityHandler = () => {
    setNavisible((curState) => {
      console.log(curState);
      return !curState;
    });
  };
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <section className="sticky top-0 left-0 right-0 z-50 bg-[#36454F] ">
        <div className="flex w-full">
          <div className="bg-[#0e0530] p-8 h-30 w-full text-white text-center content-center font-bold">
            <h2 className="my-auto text-xl text-center ">
              INVENTORY MANAGEMENT SYSTEM
            </h2>
          </div>
          <div className="absolute z-50 my-auto h-30 right-3 top-[40%]">
            {naVisible ? (
              <AiOutlineClose
                className="w-6 h-6"
                color="white"
                onClick={naVisibilityHandler}
              />
            ) : (
              <IoMenu
                className="w-6 h-6"
                color="white"
                onClick={naVisibilityHandler}
              />
            )}
          </div>
          <div
            className={`${
              naVisible ? "right-4" : "-right-full"
            } transition-all duration-300 lg:bg-gray-100 mt-[100px] z-[49]  flex flex-col lg:w-auto w-full justify-center rounded-md fixed top-0 bottom-0 gap-x-9 items-center  ${
              userState.userInfo ? "lg:h-[100px] py-15" : ""
            } lg:h-[100px]`}
          >
            {userState.userInfo ? (
              <ul className="flex flex-col items-center right-2 gap-y-1 my-4 gap-x-5 font-sans font-semibold">
                <div className="mx-auto">
                  <li className="px-4 relative group">
                    <a
                      href="/"
                      className={` cursor-pointer rounded-sm px-10 py-2 text-md font-semibold hover:bg-gray-400 hover:rounded-md `}
                    >
                      <button>Home</button>
                    </a>
                  </li>
                </div>
                {NavItemInfo.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}{" "}
                <div className="mx-auto">
                  <li className="px-4  relative group">
                    <a
                      href="/"
                      className={` cursor-pointer rounded-sm px-8 py-2 text-md font-semibold hover:bg-gray-400 hover:rounded-md `}
                    >
                      <button onClick={logoutHandler}>Log out</button>
                    </a>
                  </li>
                </div>
              </ul>
            ) : (
              <ul className="flex flex-col items-center lg:items-start gap-y-4 gap-x-5 font-sans font-bold">
                <a
                  href="/login"
                  className="cursor-pointer rounded-lg px-8 py-2 text-lg  hover:bg-gray-400 hover:rounded-lg "
                >
                  {" "}
                  <button
                    type="button"
                    className="hover:text-black px-4 py-2 lg:text-dgreen"
                  >
                    Sign in
                  </button>{" "}
                </a>
                <a
                  href="/register"
                  className="cursor-pointer rounded-lg px-8 py-2 text-lg  hover:bg-gray-400"
                >
                  {" "}
                  <button
                    type="button"
                    href="/"
                    className=" hover:text-black px-4 py-2 lg:text-dgreen"
                  >
                    Register
                  </button>{" "}
                </a>{" "}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Headers;
