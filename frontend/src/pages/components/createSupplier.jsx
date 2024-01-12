import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../Components/ErrorMessage";
import { createPortal } from "react-dom";
import SuccessMessage from "../../Components/SuccessMessage";
import { createSupplier } from "../../services/suppliers";
const CreateSupplier = ({ setAddSupplier, setSupplier }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createError, setCreateError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { mutate: addSupplierMutation, isLoading } = useMutation({
    mutationFn: ({
      supplier_id,
      supplier_name,
      contact_person,
      phone,
      email,
    }) => {
      return createSupplier({
        supplier_id,
        supplier_name,
        contact_person,
        phone,
        email,
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
      supplier_id: "",
      supplier_name: "",
      contact_person: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    console.log(data);
    const { supplier_id, supplier_name, contact_person, phone, email } = data;
    addSupplierMutation({
      supplier_id,
      supplier_name,
      contact_person,
      phone,
      email,
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
            setAddElement={setAddSupplier}
            setElement={setSupplier}
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
                <span className="font-semibold w-full">Supplier ID:</span>
                <input
                  {...register("supplier_id", {
                    required: {
                      value: true,
                      message: "Product name is required",
                    },
                  })}
                  type="number"
                  name="supplier_id"
                  className="form-input focus:outline-2  border-gray-400 border-2 rounded-md mt-1 w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Supplier name</span>
                <input
                  {...register("supplier_name", {
                    required: {
                      value: true,
                      message: "Supplier name is required",
                    },
                  })}
                  type="text"
                  name="supplier_name"
                  className="form-input border-gray-400 border-2 rounded-md mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Contact person:</span>
                <input
                  {...register("contact_person", {
                    required: {
                      value: true,
                      message: "Contact person is required",
                    },
                  })}
                  type="text"
                  name="contact_person"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
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

            <div className="flex flex-row my-auto">
              <button
                type="submit"
                disabled={addSupplierMutation.isLoading}
                className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
              >
                {isLoading ? "Adding..." : "Add Supplier"}
              </button>
              <button
                type="button"
                onClick={() => setAddSupplier(false)}
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

export default CreateSupplier;
