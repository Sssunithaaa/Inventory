import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createProduct } from "../../services/products";
import toast from "react-hot-toast";
import ErrorMessage from "../../Components/ErrorMessage";
import { createPortal } from "react-dom";
import SuccessMessage from "../../Components/SuccessMessage";
const CreatePost = ({ setAddProduct, setProduct }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createError, setCreateError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { mutate: addProductMutation, isLoading } = useMutation({
    mutationFn: ({
      product_name,
      description,
      price,
      quantity_on_hand,
      category_id,
      supplier_id,
    }) => {
      return createProduct({
        product_name,
        description,
        price,
        quantity_on_hand,
        category_id,
        supplier_id,
      });
    },
    onSuccess: (data) => {
      toast.success("Product added successfully");
      setSuccess(true);
      setSuccessMessage("Product added successfully");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
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
      product_name: "",
      description: "",
      price: "",
      quantity_on_hand: "",
      category_id: "",
      supplier_id: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    console.log(data);
    const {
      product_name,
      description,
      price,
      quantity_on_hand,
      category_id,
      supplier_id,
    } = data;
    addProductMutation({
      product_name,
      description,
      price,
      quantity_on_hand,
      category_id,
      supplier_id,
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
          document.getElementById("error") // Check if this element exists in your HTML
        )}
      {success &&
        createPortal(
          <SuccessMessage
            message={successMessage}
            setAddElement={setAddProduct}
            setElement={setProduct}
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
                <span className="font-semibold w-full">Product Name:</span>
                <input
                  {...register("product_name", {
                    required: {
                      value: true,
                      message: "Product name is required",
                    },
                  })}
                  type="text"
                  name="product_name"
                  className="form-input focus:outline-2  border-gray-400 border-2 rounded-md mt-1 w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Description:</span>
                <input
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Product description is required",
                    },
                  })}
                  type="text"
                  name="description"
                  className="form-input border-gray-400 border-2 rounded-md mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Price:</span>
                <input
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Product price is required",
                    },
                  })}
                  type="number"
                  name="price"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Quantity on hand:</span>
                <input
                  {...register("quantity_on_hand", {
                    required: {
                      value: true,
                      message: "Product quantity is required",
                    },
                  })}
                  type="number"
                  name="quantity_on_hand"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Category ID:</span>
                <input
                  {...register("category_id", {
                    required: {
                      value: true,
                      message: "Product category is required",
                    },
                  })}
                  type="number"
                  name="category_id"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-row">
                <span className="font-semibold w-full">Supplier ID:</span>
                <input
                  {...register("supplier_id", {
                    required: {
                      value: true,
                      message: "Product supplier ID is required",
                    },
                  })}
                  type="number"
                  name="supplier_id"
                  className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                  required
                />
              </label>
            </div>
            <div className="flex flex-row my-auto">
              <button
                type="submit"
                disabled={addProductMutation.isLoading}
                className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
              >
                {addProductMutation.isLoading ? "Adding..." : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => setAddProduct(false)}
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

export default CreatePost;
