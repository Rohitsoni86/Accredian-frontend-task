import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { FaCircleUser } from "react-icons/fa6";

// REDUX TOOLKIT

import { useSelector, useDispatch } from "react-redux";
import { makeUserLogin } from "../appStore/Features/userLog";
import { fetchUserDetails } from "../appStore/Features/userDetails";

export default function Login() {
  const navigate = useNavigate();

  // Rect Redux

  const dispatch = useDispatch();
  const authenticationState = useSelector((state) => state.authentication);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (dataObject) => {
  
    console.log(dataObject);
    // Redux CALL

    dispatch(makeUserLogin(dataObject))
      .unwrap()
      .then((tokenF) => {
        console.log(tokenF);
        dispatch(fetchUserDetails(tokenF));
        navigate("/Home");
      })
      .catch((err) => {
        {
          console.log(err);
        }
      })
     
  };

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <FaCircleUser
          size={60}
            className="mx-auto  w-full"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(loginUser)} className="space-y-6">
            <Input
              label={"User Name"}
              ErrorText={errors.UserName?.message && <small>{errors.UserName.message}</small>}
              labelClass={` text-sm font-medium leading-6 text-gray-900`}
              labelText={"User Name"}
              type={"text"}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              name="UserName"
              {...register("UserName", {
                required: "UserName is required",
                validate: {
                  maxLength: (v) =>
                    v.length <= 20 ||
                    "The Name should have at most 20 characters",
                  matchPattern: (v) =>
                  /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(v) ||
                    "UserName Should Be Alphanumeric only !",
                },
              })}
            />
           
            <div>
              <div className="mt-2">
                <Input
                  label={"password"}
                  ErrorText= {errors.Password?.message && (
                  <small>{errors.Password.message}</small>
                )}
                  labelClass={` text-sm font-medium leading-6 text-gray-900`}
                  labelText={"Enter Password"}
                  type={"password"}
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  name="password"
                  {...register("Password", {
                    required: "Password is required",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 ||
                        "The Password should have at most 50 characters",
                      minLength: (v) =>
                        v.length >= 8 ||
                        "The Password should have at least 8 characters",
                    },
                  })}
                />
              </div>
            </div>
            <div className="text-sm">
              <button
                onClick={() =>
                  alert(
                    "Currently We Are Working On This Feature Check Your Mail We Send Your Password There !! \n Thank you !!"
                  )
                }
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
