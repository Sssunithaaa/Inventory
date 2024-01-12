import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createTransaction } from "../../services/transactions";
import ErrorMessage from "../../Components/ErrorMessage";
import { createPortal } from "react-dom";
import SuccessMessage from "../../Components/SuccessMessage";
import { useState } from "react";
const CreateTransaction = ({ setAddTransaction, setTransaction }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createError, setCreateError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { mutate: addTransactionMutation, isLoading } = useMutation({
    mutationFn: ({
      transaction_type,
      quantity_change,
      product_id,
      client_id,
      supplier_id,
    }) => {
      return createTransaction({
        transaction_type,
        quantity_change,
        product_id,
        client_id,
        supplier_id,
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
      window.alert(error);
      setCreateError(true);
      setErrorMessage(error.message);
    },

    onSuccess: (data) => {
      toast.success("Product added successfully");
      setSuccess(true);
      setSuccessMessage("Transaction added successfully");
      // Trigger refetch in ProductLayout
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      transaction_type: "",
      quantity_change: "",
      product_id: "",
      client_id: null,
      supplier_id: null,
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    console.log(data);
    let {
      transaction_type,
      quantity_change,
      product_id,
      client_id,
      supplier_id,
    } = data;
    if (client_id?.length === 0) {
      client_id = null;
    }
    if (supplier_id?.length === 0) {
      supplier_id = null;
    }
    addTransactionMutation({
      transaction_type,
      quantity_change,
      product_id,
      client_id,
      supplier_id,
    });
  };
  function printRecept() {
    window.print();
  }
  return (
    <>
      {createError &&
        createPortal(
          <ErrorMessage
            message={errorMessage}
            setCreateError={setCreateError}
          />,
          document.getElementById("error") // Check if this element exists in your HTML
        )}
      {success &&
        createPortal(
          <SuccessMessage
            message={successMessage}
            setElement={setTransaction}
            setAddElement={setAddTransaction}
          />,
          document.getElementById("success") // Check if this element exists in your HTML
        )}
      <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
        <div className="h-fit max-w-4xl w-[500px] mx-auto my-auto rounded-lg bg-white p-5">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-[400px] my-10 p-0 space-y-6 mx-auto"
          >
            <div className="w-[400px]">
              <label className="flex flex-row">
                <span className="font-semibold w-full">Product ID:</span>
                <input
                  {...register("product_id", {
                    required: {
                      value: true,
                      message: "Product id is required",
                    },
                  })}
                  type="text"
                  name="product_id"
                  className="form-input focus:outline-2  border-gray-400 border-2 rounded-md mt-1 w-full"
                  required
                />
              </label>
              {errors?.product_id?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.product_id.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Transaction Type:</span>
                <input
                  {...register("transaction_type", {
                    required: {
                      value: true,
                      message: "Product transaction_type is required",
                    },
                  })}
                  type="text"
                  name="transaction_type"
                  className="form-input border-gray-400 border-2 rounded-md mt-1 block w-full"
                  required
                />
              </label>
              {errors?.transaction_type?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.transaction_type.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Quantity Change:</span>
                <input
                  {...register("quantity_change", {
                    required: {
                      value: true,
                      message: "Product quantity_change is required",
                    },
                  })}
                  type="number"
                  name="quantity_change"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Supplier ID:</span>
                <input
                  {...register("supplier_id")}
                  type="number"
                  name="supplier_id"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Client ID:</span>
                <input
                  {...register("client_id")}
                  type="number"
                  name="client_id"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                />
              </label>
            </div>

            <div className="flex flex-row">
              <button
                type="submit"
                disabled={addTransactionMutation.isLoading}
                className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
              >
                {addTransactionMutation.isLoading
                  ? "Adding..."
                  : "Add transaction"}
              </button>
              <button
                type="button"
                onClick={() => setAddTransaction(false)}
                className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={printRecept}
                className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
              >
                Print Receipt
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTransaction;
