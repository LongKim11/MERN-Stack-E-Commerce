import React from "react";
import loginIcon from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prev) => {
      return { ...prev, profilePic: imagePic };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <section id="signup">
      <div className="container mx-auto p-4">
        <div className="p-5 w-full max-w-sm bg-white mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img
                src={data.profilePic ? data.profilePic : loginIcon}
                alt="login icon"
              ></img>
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 pb-4 pt-2 cursor-pointer bg-slate-200 py-4 text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                ></input>
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-full outline-none bg-transparent"
                  name="name"
                  value={data.name}
                  onChange={handleDataChange}
                  required
                ></input>
              </div>
            </div>
            <div>
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-full outline-none bg-transparent"
                  name="email"
                  value={data.email}
                  onChange={handleDataChange}
                  required
                ></input>
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  value={data.password}
                  onChange={handleDataChange}
                  required
                ></input>

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="w-full h-full outline-none bg-transparent"
                  name="confirmpassword"
                  value={data.confirmPassword}
                  onChange={handleDataChange}
                  required
                ></input>

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
