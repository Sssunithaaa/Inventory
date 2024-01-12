import React from "react";
import { useForm } from "react-hook-form";
import Headers from "../../Components/Headers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../services//user";
import { useEffect } from "react";
import { userActions } from "../../store/reducers/userReducers";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, PASSWORD }) => {
      return signin({ email, PASSWORD });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  useEffect(() => {
    if (userState.userInfo) {
      navigate("/home");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { email, PASSWORD } = data;
    mutate({ email, PASSWORD });
  };
  return (
    <>
      <Headers />
      <section className="container mx-auto px-5 py-5 my-5">
        <div className="mx-auto max-w-lg w-full">
          <h1 className="font-sans text-2xl font-bold text-center px-5  text-dgreen">
            SIGN IN
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[30rem] mx-auto mt-8 border-2 border-slate-300 p-7"
          >
            <div className="my-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              {/*className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
              <input
                type="text"
                className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email"
                name="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-4">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="my-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="PASSWORD"
                className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter password"
                name="PASSWORD"
                {...register("PASSWORD", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 1,
                    message: "Password field cannot be empty",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-4">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="px-20 flex mx-auto my-5 hover:bg-blue-800 bg-blue-700 font-semibold py-1 font-sans text-white text-xl rounded-lg border-2 border-blue-700 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-120 "
            >
              Login
            </button>
            <div className="my-2">
              <h3 className="font-sans font-medium ml-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-700">
                  Register
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
