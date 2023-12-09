import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";

// REDUX TOOLKIT

import { useSelector, useDispatch } from "react-redux";
import { registerNewUser } from "../appStore/Features/createNewUser";
import SuccessModal from "../components/SuccessModal";

export default function Signup() {
 
  /// For Modal

  const [showModal, setShowModal] = useState(false);
  const [signupStatus,setSignupStatus] = useState(false)
  

  const navigate = useNavigate();

   // Rect Redux

   const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const registerUser = (dataObject) => {
   
    console.log(dataObject);
    document.getElementById("signupForm").reset();

    // Redux Request

    dispatch(registerNewUser(dataObject))
    .unwrap()
    .then((fetchedDataRes) => {
      console.log(fetchedDataRes);
      //  Show Success Modal
      setSignupStatus(true)
      setShowModal(true)
    // navigate("/login");
    })
    .catch((err) => {
      ///Show error modal
      alert(err)
    })
  };

  return (
    <>

  {showModal && (
        <SuccessModal
          status={signupStatus}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div className="flex  h-full w-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Register To Become a New User
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form
            id="signupForm"
            onSubmit={handleSubmit(registerUser)}
            className="space-y-6"
          >
            {/*User Name */}
            <Input
              label={"User Name"}
              ErrorText={errors.UserName?.message && (
              <small>{errors.UserName.message}</small>
            )}
              labelClass={`block text-sm font-medium leading-6 text-black`}
              labelText={"User Name :"}
              type={"text"}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              name="UserName"
              {...register("UserName", {
                required: "UserName is required !",
                validate: {
                  minLength: (v) =>
                    v.length >= 3 ||
                    "The Name should have at least 3 characters",
                  matchPattern: (v) =>
                    /^[a-zA-Z0-9_]+$/.test(v) ||
                    "Please Enter Correct UserName",
                },
              })}
            />

            {/* EMAIL */}
            <Input
              label={"email"}
              ErrorText= {errors.Email?.message && <small>{errors.Email.message}</small>}
              labelClass={`block text-sm font-medium leading-6 text-black`}
              labelText={"Email address :"}
              type={"email"}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              name="email"
              {...register("Email", {
                required: "Email is required !",
                validate: {
                  maxLength: (v) =>
                    v.length <= 50 ||
                    "The email should have at most 50 characters",
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                },
              })}
            />
           
            <div>
              {/* Password */}

              <div className="mt-2">
                <Input
                  label={"password"}
                  ErrorText= {errors.Password?.message && (
                  <small>{errors.Password.message}</small>
                )}
                  labelClass={`block text-sm font-medium leading-6 text-black`}
                  labelText={"Enter Password"}
                  type={"password"}
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  name="password"
                  {...register("Password", {
                    required: "Password is required !",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 15 ||
                        "The Password should have at most 15 characters",
                      minLength: (v) =>
                        v.length >= 8 ||
                        "The Password should have at least 8 characters",
                    },
                  })}
                />
              </div>
            
             {/* Confirm Password */}

              <div className="mt-2">
                <Input
                  label={"Confirm Password"}
                  ErrorText={errors.ConfirmPassword?.message && (
                  <small>{errors.ConfirmPassword.message}</small>
                )}
                  labelClass={`block text-sm font-medium leading-6 text-black`}
                  labelText={"Confirm Password"}
                  type={"password"}
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  name="ConfirmPassword"
                  {...register("ConfirmPassword", {
                    required: "ConfirmPassword is required !",
                    validate: (val) => {
                    if (watch('Password') != val) {
                       return "Your passwords do no match"; }
                    },
                  })}
                />
              </div>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-pink-400 hover:text-pink-500"
              >
                Forgot password?
              </a>
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
        </div>
      </div>
    </>
  );
}
