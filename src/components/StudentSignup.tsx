import React, { useState } from "react";
import axios from "../helper/axios";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../auth/LoginContext";
import Swal from "sweetalert2";
import { Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";

const AuthPage = () => {
  const { dispatch }: any = useLogin();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [register, setRegister] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    phone_no: "",
    user_type: "students", // Default user type
  });

  const [payload, setPayload] = useState({
    email: "",
    user_password: "",
  });

  const handleChange = (field: string, value: string) => {
    setRegister((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChangelogin = (field: string, value: string) => {
    setPayload((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("/api/AI_Interviewers/login/", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.token) {
        Swal.fire({
          title: "Login successful!",
          icon: "success",
        });

        // Extract user and token from response
        const user_data = response.data;
        const { token: newToken, ...user } = response.data;

        // Save user and token to localStorage
        localStorage.setItem("user", JSON.stringify(user_data));
        localStorage.setItem("token", newToken);

        // Dispatch login action
        dispatch({ type: "LOGIN", payload: { user, token: newToken } });

        // Redirect user based on their type
        switch (user.user_type) {
          case "HR":
            navigate("/profile");
            break;
          case "admin":
            navigate("/admin_business_msg");
            break;
          case "students":
            navigate("/profile");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        Swal.fire({
          title: "Login failed!",
          text: "Invalid email or password.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Login failed!",
        icon: "error",
      });
    }
  };


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/insert/student_level_register/",
        new URLSearchParams(register), // Convert object to `application/x-www-form-urlencoded`
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      Swal.fire({
        title: "Signup successful!",
        icon: "success",
      });
      setIsLogin(true); // Switch to login after successful signup
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Signup failed! Please try again.";

      Swal.fire({
        title: "Signup failed!",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="bg-white shadow-2xl rounded-2xl flex overflow-hidden w-[80%] max-w-5xl transform hover:scale-[1.02] transition-transform duration-300">
        {/* Image Section */}


        <div
          className={`w-1/2 ${isLogin ? "order-1" : "order-2"
            } bg-gradient-to-br from-indigo-600 to-blue-500 p-12 flex flex-col items-center justify-center relative overflow-hidden`}
          style={{
            backgroundImage: `url(${isLogin
                ? `${process.env.PUBLIC_URL}/login.png`
                : `${process.env.PUBLIC_URL}/login.png`
              })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className=""></div>

        </div>
        {/* Form Section */}
        <div className="w-1/2 p-12 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            <p className="text-gray-600 mb-8">
              {isLogin
                ? "Please sign in to continue"
                : "Fill in your details to create an account"}
            </p>

            <form
              onSubmit={isLogin ? handleSubmit : handleSignup}
              className="space-y-6"
            >
              {!isLogin && (
                <>
                  {/* Full Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      onChange={(e) => handleChange("user_name", e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your phone number"
                      onChange={(e) => handleChange("phone_no", e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    isLogin
                      ? handleChangelogin("email", e.target.value)
                      : handleChange("user_email", e.target.value)
                  }
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    isLogin
                      ? handleChangelogin("user_password", e.target.value)
                      : handleChange("user_password", e.target.value)
                  }
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-950 text-white rounded-lg py-3 px-4 font-medium hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
