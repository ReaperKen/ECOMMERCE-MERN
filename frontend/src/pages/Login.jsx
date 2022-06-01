import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoadingSmall from "../components/Loading/LoadingSmall";
import Error from "../components/Error/Error";

const initialForm = {
  username: "",
  password: "",
};
const Login = () => {
  const [form, setForm] = useState(initialForm);
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://mernstacke.herokuapp.com/auth/login",
        form
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    }
  };
  return (
    <div className="min-h-screen w-4/5 mx-auto flex flex-col items-center justify-evenly">
      <h1 className="font-bold text-4xl  uppercase tracking-widest">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex h-full space-y-12 items-center flex-col w-full"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          autoComplete="off"
          className="py-2 ring-2 ring-slate-500 rounded-lg w-full"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="py-2 ring-2 ring-slate-500 rounded-lg w-full"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 ring-2 ring-transparent bg-slate-800 rounded-xl text-white uppercase tracking-wider"
        >
          Login
        </button>
        {error && <Error>{error.message}</Error>}
        {/* {error?.response && (
          <>
            <p className="text-center text-3xl text-red-800">
              {error.response?.data?.message}
            </p>
          </>
        )} */}
        {loading && <LoadingSmall />}
      </form>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h2 className="font-bold text-2xl uppercase">New here?</h2>
        <Link
          to="/register"
          className="py-2 px-4 ring-2 ring-transparent bg-slate-800 rounded-xl text-white uppercase tracking-wider"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
