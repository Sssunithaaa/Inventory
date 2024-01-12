import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
const ErrorMessage = ({ message, setCreateError }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
      <div className="mx-auto w-full flex flex-col max-w-md px-4 py-2 text-center font-sans rounded-md font-bold text-black bg-white my-auto">
        <p className="text-lg my-2">{message}</p>
        <button
          className="bg-black flex my-2 text-white font-semibold py-1 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
          onClick={() => setCreateError(false)}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
