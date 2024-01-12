import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Headers from "../../Components/Headers";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/user";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: ({ name, email, PASSWORD, role }) => {
      return signup({ name, email, PASSWORD, role });
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      dispatch(userActions.setUserInfo(data));
      toast.success("Registration successful");
      localStorage.setItem("account", JSON.stringify(data));
      navigate("/"); // Navigate to the home page
    },
    onError: (error) => {
      <ToastContainer autoClose={5000} hideProgressBar={true} />;
      toast(error.message);
      window.alert(error.message);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);
  useEffect(() => {
    if (isSuccess) {
      // Assuming the navigation logic is correct, you might want to adjust this accordingly
      navigate("/");
    }
  }, [isSuccess, navigate]);
  console.log(isError);
  console.log(isSuccess);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      PASSWORD: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const submitHandler = (data) => {
    console.log(data);
    const { name, email, PASSWORD, role } = data;
    mutate({ name, email, PASSWORD, role });
  };

  const password = watch("PASSWORD");
  return (
    <>
      <Headers />
      <section className="container mx-auto px-5 py-5 z-1000">
        <div className="mx-auto max-w-lg w-full">
          <h1 className="font-sans text-2xl font-bold text-center px-5  text-dgreen">
            SIGN UP
          </h1>
          <form
            className=" font-sans w-full h-auto my-5 py-5 px-7 border-2  rounded-lg "
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="w-[90%] mt-5 ml-2">
              <label
                htmlFor="email"
                className=" font-semibold mx-auto text-lg ml-3"
              >
                Email
              </label>
              <input
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email format is invalid",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                className={`placeholder: px-5  w-full border-2 h-[35px] mt-3 block outline-none content-center  ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
                type="email"
                placeholder="Enter your email"
              ></input>
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1 ml-3 font-semibold">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="w-[90%] mt-5 ml-2">
              <label
                htmlFor="name"
                className="font-semibold mx-auto text-lg ml-3"
              >
                Name
              </label>
              <input
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name must include atleast one character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                className={`placeholder: px-5 w-full border-2 h-[35px] mt-3 block outline-none  content-center  ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
                type="text"
                placeholder="Enter your name"
              ></input>
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1 ml-3 font-semibold">
                  {errors.name?.message}
                </p>
              )}
            </div>
            {/*<div className='w-[90%] mt-5 ml-2'>
                <label htmlFor="contactNumber" className='font-semibold mx-auto text-lg ml-3'>Contact Number</label>
                <input {...register("contactNumber",{
                    minLength:{
                        value:10,
                        message:"Contact number must contain 10 characters"
                    },
                    required:{
                        value:true,
                        message:"Contact number is required"
                    }
                })} className={`placeholder: px-5 w-full border-2 h-[35px] mt-3 block outline-none  content-center  ${errors.contactNumber ? "border-red-500":"border-[#c3cad9]"}`} type="text"    placeholder='Enter your contact number'></input>
                    {errors.contactNumber?.message && (
                        <p className='text-red-500 text-xs mt-1 ml-3 font-semibold'>{errors.contactNumber?.message}</p>
                    )}
                    </div> */}
            <div className="w-[90%] mt-5 ml-2">
              <label
                htmlFor="role"
                className="font-semibold mx-auto text-lg ml-3"
              >
                Role
              </label>
              <input
                {...register("role", {
                  required: {
                    value: true,
                    message: "Role is required",
                  },
                })}
                className={`placeholder: px-5 w-full border-2 h-[35px] mt-3 block outline-none  content-center  ${
                  errors.role ? "border-red-500" : "border-[#c3cad9]"
                }`}
                type="text"
                placeholder="Enter your role"
              ></input>
              {errors.role?.message && (
                <p className="text-red-500 text-xs mt-1 ml-3 font-semibold">
                  {errors.role?.message}
                </p>
              )}
            </div>

            <div className="w-[90%] mt-5 ml-2">
              <label
                htmlFor="PASSWORD"
                className=" font-semibold mx-auto text-lg ml-3"
              >
                Password
              </label>
              <input
                {...register("PASSWORD", {
                  minLength: {
                    value: 8,
                    message: "Password must contain atleast 8 characters",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                className={`placeholder: px-5 w-full border-2 h-[35px] mt-3 block outline-none  content-center ${
                  errors.PASSWORD ? "border-red-500" : "border-[#c3cad9]"
                }`}
                type="password"
                placeholder="Enter your password"
              ></input>
              {errors.PASSWORD?.message && (
                <p className="text-red-500 text-xs mt-1 ml-3 font-semibold">
                  {errors.PASSWORD?.message}
                </p>
              )}
            </div>
            <div className="w-[90%] mt-5 ml-2">
              <label
                htmlFor="confirmPassword"
                className=" font-semibold mx-auto text-lg ml-3"
              >
                Confirm password
              </label>
              <input
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Enter password again",
                  },
                  validate: (value) => {
                    if (password !== value) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                className={`placeholder: px-5 w-full border-2 h-[35px] mt-3 block outline-none  content-center ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
                type="password"
                placeholder="Confirm password "
              ></input>
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1 ml-3 font-semibold">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="px-20 flex mx-auto my-5 bg-navy font-semibold py-1 font-sans text-white text-xl rounded-lg border-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-120 "
            >
              Register
            </button>
            <div>
              <h3 className="font-sans font-medium ml-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-800">
                  Login
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
