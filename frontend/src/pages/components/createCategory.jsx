import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCategory } from "../../services/categories";
import toast from "react-hot-toast";

const CreateCategory = ({ setAddCategory, setCategory }) => {
  const { mutate: addCategoryMutation, isLoading } = useMutation({
    mutationFn: ({ category_name }) => {
      return createCategory({
        category_name,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      category_name: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    console.log(data);
    const { category_name } = data;
    addCategoryMutation({
      category_name,
    });
    setAddCategory(false);
    setCategory(true);
  };
  return (
    <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
      <div className="h-fit max-w-4xl w-[500px] mx-auto my-auto rounded-lg bg-white p-5">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-[400px] my-10 p-0 space-y-6 mx-auto"
        >
          <div className="w-[400px]">
            <label className="flex flex-row">
              <span className="font-semibold w-full">Category Name:</span>
              <input
                {...register("category_name", {
                  required: {
                    value: true,
                    message: "Category name is required",
                  },
                })}
                type="text"
                name="category_name"
                className="form-input focus:outline-2  border-gray-400 border-2 rounded-md mt-1 w-full"
                required
              />
            </label>
          </div>

          <div className="flex flex-row">
            <button
              type="submit"
              disabled={addCategoryMutation.isLoading}
              className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
            >
              {addCategoryMutation.isLoading ? "Adding..." : "Add Category"}
            </button>
            <button
              type="button"
              onClick={() => setAddCategory(false)}
              className="bg-purple-500 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center hover:bg-purple-950"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
