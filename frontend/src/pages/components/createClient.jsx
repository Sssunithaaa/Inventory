import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../Components/ErrorMessage";
import { createPortal } from "react-dom";
import SuccessMessage from "../../Components/SuccessMessage";
import { createClient } from "../../services/clients";
const CreateClient = ({ setAddClient, setClient }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createError, setCreateError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { mutate: addClientMutation, isLoading } = useMutation({
    mutationFn: ({
      client_id,
      client_name,
      email,
      phone,
      shipping_address,
    }) => {
      return createClient({
        client_id,
        client_name,
        email,
        phone,
        shipping_address,
      });
    },
    onSuccess: (data) => {
      setSuccess(true);
      setSuccessMessage("Supplier added successfully");
    },
    onError: (error) => {
      console.log(error.message);
      window.alert(error);
      setCreateError(true);
      setErrorMessage(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      client_id: "",
      client_name: "",
      email: "",
      phone: "",
      shipping_address: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    console.log(data);
    const { client_id, client_name, email, phone, shipping_address } = data;
    addClientMutation({
      client_id,
      client_name,
      email,
      phone,
      shipping_address,
    });
  };
  return (
    <>
      {createError &&
        createPortal(
          <ErrorMessage
            message={errorMessage}
            setCreateError={setCreateError}
          />,
          document.getElementById("error")
        )}
      {success &&
        createPortal(
          <SuccessMessage
            message={successMessage}
            setAddElement={setAddClient}
            setElement={setClient}
          />,
          document.getElementById("success")
        )}
      <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
        <div className="h-fit max-w-4xl w-[500px] mx-auto my-auto rounded-lg bg-white p-5">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-[400px] my-10 p-0 space-y-6 mx-auto"
          >
            <div className="w-[400px]">
              <label className="flex flex-row">
                <span className="font-semibold w-full">Client ID:</span>
                <input
                  {...register("client_id", {
                    required: {
                      value: true,
                      message: "Client name is required",
                    },
                  })}
                  type="number"
                  name="client_id"
                  className="form-input focus:outline-2  border-gray-400 border-2 rounded-md mt-1 w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Client name</span>
                <input
                  {...register("client_name", {
                    required: {
                      value: true,
                      message: "Client name is required",
                    },
                  })}
                  type="text"
                  name="client_name"
                  className="form-input border-gray-400 border-2 rounded-md mt-1 block w-full"
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Phone number:</span>
                <input
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                  })}
                  type="text"
                  name="phone"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Email:</span>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  type="email"
                  name="email"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Shipping address</span>
                <input
                  {...register("shipping_address", {
                    required: {
                      value: true,
                      message: "Shipping address is required",
                    },
                  })}
                  type="text"
                  name="shipping_address"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                  required
                />
              </label>
            </div>

            <div className="flex flex-row my-auto">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
              >
                {isLoading ? "Adding..." : "Add Client"}
              </button>
              <button
                type="button"
                onClick={() => setAddClient(false)}
                className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateClient;
