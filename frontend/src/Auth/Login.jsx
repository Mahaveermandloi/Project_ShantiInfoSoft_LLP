import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../public/Images/OIP.jpeg";
import { postApi } from "../Utils/API";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Components/Toast";
import mainimage from "../../public/Images/mainimage.png";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    const url = "/login";
    try {
      const response = await postApi(data, url);

      if (response.status === 200) {
        const role = response.data.data.role;
        localStorage.setItem("accessToken", response.data.data.accessToken);

        localStorage.setItem("role", role);
        toast.success("Login successful!");

        if (role === "admin") {
          localStorage.setItem("email", response.data.data.admin.email);
          navigate("/dashboard");
        } else if (role === "user") {
          localStorage.setItem("email", response.data.data.user.email);
          navigate("/user/dashboard");
        }
        window.location.reload();
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="lg:flex hidden lg:w-2/3  h-screen">
          <img src={mainimage} alt=""  className="w-full"/>
        </div>

        <div className="w-full lg:w-1/3 bg-cyan-500">
          <Toast />

          <section className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <img src={img} className="w-20" alt="" />
              <div className="w-full bg-gray-200 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-[#ed1450] md:text-2xl">
                    Login to Dashboard
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-800"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        id="email"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="name@company.com"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message:
                                "Password should have at least 6 characters",
                            },
                          })}
                          id="password"
                          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                            errors.password ? "border-red-500" : ""
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                          aria-label={
                            isPasswordVisible
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {isPasswordVisible ? (
                            <svg
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.483-2.939M12 5c.715 0 1.41.062 2.083.18M9.173 9.173a3 3 0 014.243 4.243M3.707 3.707l16.586 16.586"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <span className="text-red-500 text-sm">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Log In
                    </button>
                    <p className="text-md text-gray-900 font-semibold cursor-pointer hover:text-red-600">
                      Forgot Password?
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
