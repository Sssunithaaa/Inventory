import React from "react";

const SuccessMessage = ({ message, setAddElement, setElement }) => {
  const handler = () => {
    setAddElement(false); // Close the modal
    setElement(true);
  };
  return (
    <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
      <div className="mx-auto w-full flex flex-col max-w-md px-3 py-2 text-center font-sans rounded-md font-bold text-black bg-white my-auto">
        <p className="text-lg my-5">{message}</p>
        <button
          className="bg-purple-500 flex mb-5 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
          onClick={handler}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
