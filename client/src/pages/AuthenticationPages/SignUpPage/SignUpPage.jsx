import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import registerimage from "../../../assets/registerimage.png";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const SignUp = () => {
  const { isDarkMode } = useDarkMode();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    verificationCode: "",
    latitude: "",
    longitude: "",
    locationName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value) => {
    const errors = { ...validationErrors };

    switch (name) {
      case "username":
        if (value.length < 3) {
          errors.username = "Username must be at least 3 characters";
        } else {
          delete errors.username;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.email = "Please enter a valid email (e.g., user@example.com)";
        } else {
          delete errors.email;
        }
        break;
      case "password":
        if (value.length < 6) {
          errors.password = "Password must be at least 6 characters";
        } else {
          delete errors.password;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          errors.confirmPassword = "Passwords do not match";
        } else {
          delete errors.confirmPassword;
        }
        break;
      case "userType":
        if (!value) {
          errors.userType = "Please select a user type";
        } else {
          delete errors.userType;
        }
        break;
      case "verificationCode":
        if (value.length < 1) {
          errors.verificationCode = "Verification code is required";
        } else {
          delete errors.verificationCode;
        }
        break;
      case "locationName":
        if (value.length < 2) {
          errors.locationName = "Location name must be at least 2 characters";
        } else {
          delete errors.locationName;
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    // Validate all required fields
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.userType ||
      !formData.verificationCode ||
      !formData.locationName ||
      !formData.latitude ||
      !formData.longitude
    ) {
      console.error("Please fill in all required fields");
      return;
    }

    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      console.log("Registration successful");
      navigate("/");
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  return (
    <div
      className={`min-h-screen font-serif text-sm md:text-base flex justify-center items-center px-4 py-8 ${isDarkMode ? "shadow bg-gradient-to-r from-gray-700/70 to-gray-900/70" : "bg-white/60 shadow-xl"}`}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row w-full bg-gray-300/70 rounded-xl shadow-lg overflow-hidden">
          <div
            className="w-full hidden lg:w-1/2 lg:flex flex-col items-center justify-center gap-4 p-8 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${registerimage})` }}
          >
            <div className="bg-white/60 rounded-xl p-6">
              <h1 className="text-gray-900 text-3xl mb-3 font-mono">
                Welcome to FOODEEN
              </h1>
              <p className="text-gray-900 tracking-wide text-sm">
                Sign up now and join the movement with FoodLink! Whether you're
                a restaurant looking to donate surplus food or an NGO seeking
                support, our platform empowers you to make a meaningful impact.
                Together, let's build a hunger-free world, one meal at a time.
              </p>
              <p className="text-gray-900 mt-8 text-sm">
                Sign in if you already have an account
              </p>
              <Link
                to="/sign-in"
                className="inline-block w-full rounded-md bg-purple-500 py-3 hover:bg-blue-700 disabled:cursor-not-allowed text-center text-white transition duration-200 ease-in-out hover:scale-105 mt-4"
              >
                <button className="">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
          <div
            className={`w-full lg:w-1/2 py-12 px-6 sm:px-12 ${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} rounded-xl flex flex-col justify-start overflow-y-auto max-h-screen`}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Register</h2>
            <p className="mb-4 text-sm">
              Create your account. It's free and only takes a minute.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mt-5">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`border py-1 px-2 w-full rounded-md ${validationErrors.username ? "border-red-500" : "border-gray-400"}`}
                  required
                />
                {validationErrors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.username}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border rounded-md py-1 px-2 w-full ${validationErrors.email ? "border-red-500" : "border-gray-400"}`}
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div className="mt-5 input-group relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`border rounded-md py-1 px-2 w-full ${validationErrors.password ? "border-red-500" : "border-gray-400"}`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {validationErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.password}
                  </p>
                )}
                <div className="mt-5 input-group">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute rounded-md top-2 right-0.5 text-gray-500"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 0a9 9 0 00-9 9c0 8 9 11 9 11s9-3 9-11a9 9 0 00-9-9zm0 15a4 4 0 100-8 4 4 0 000 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 0a9 9 0 00-9 9c0 8 9 11 9 11s9-3 9-11a9 9 0 00-9-9zm0 15a4 4 0 100-8 4 4 0 000 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-2">
                {!passwordMatch && (
                  <p className="text-red-500">Passwords do not match</p>
                )}
              </div>
              <div className="mt-5">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`border rounded-md py-1 px-2 w-full ${validationErrors.confirmPassword ? "border-red-500" : "border-gray-400"}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <select
                  name="userType"
                  onChange={handleChange}
                  className="rounded-md text-sm md:text-md p-2"
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Charity/NGO">Charity/NGO</option>
                </select>
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="Verification Code"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="border font-mono border-gray-400 py-1 px-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  name="locationName"
                  placeholder="Location name"
                  value={formData.locationName}
                  onChange={handleChange}
                  className="border rounded-md border-gray-400 py-1 px-2 w-full"
                  required
                />
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleLocationClick}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M10 0a9 9 0 00-9 9c0 8 9 11 9 11s9-3 9-11a9 9 0 00-9-9zm0 15a4 4 0 100-8 4 4 0 000 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Add My Location
                </button>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  // disabled={passwordMatch || !formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.verificationCode || !formData.locationName ? true : false}
                  className="w-full bg-purple-500 py-3 hover:bg-blue-700 disabled:cursor-not-allowed text-center text-white transition duration-200 ease-in-out hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-5">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/sign-in"
                    className="text-purple-500 transition duration-200 ease-in-out hover:scale-105"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
