import React from "react";
import loginIcon from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { useState, useContext } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import summaryAPI from "../common";
import { toast } from "react-toastify";
import Context from "../context/index.";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(summaryAPI.signIn.url, data, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/");
          fetchUserDetails();
        } else {
          toast.error(res.data.message);
        }
        console.log(res);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  return (
    <section id="login">
      <div className="container mx-auto p-4">
        <div className="p-5 w-full max-w-sm bg-white mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon"></img>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
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
                ></input>

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password?
              </Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have account?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
