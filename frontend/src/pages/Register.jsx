import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";
import { AuthContext } from "../context/AuthContext";

const initialForm = {
  username: "",
  email: "",
  password: "",
  age: null,
};
const Register = () => {
  const { error, loading, dispatch } = useContext(AuthContext);
  const [form, setForm] = useState(initialForm);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mernstacke.herokuapp.com/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        age: form.age,
      });
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data });
    }
  };
  return (
    <div className="min-h-screen w-4/5 mx-auto flex flex-col items-center justify-evenly">
      <h1 className="font-bold text-4xl  uppercase tracking-widest">
        Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex h-full space-y-12 flex-col w-full"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          autoComplete="off"
          className="py-2 ring-2 ring-slate-500 rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          autoComplete="off"
          className="py-2 ring-2 ring-slate-500 rounded-lg"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="py-2 ring-2 ring-slate-500 rounded-lg"
          autoComplete="off"
        />
        <input
          type="number"
          name="age"
          onChange={handleChange}
          autoComplete="off"
          placeholder="Age"
          className="py-2 ring-2 ring-slate-500 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 ring-2 ring-transparent bg-slate-800 rounded-xl text-white uppercase tracking-wider"
        >
          Register
        </button>
        {error && <Error>{error.message}</Error>}
        {loading && <Loading />}
      </form>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h2 className="font-bold text-2xl uppercase">Welcome back!</h2>
        <Link
          to="/login"
          className="py-2 px-4 ring-2 ring-transparent bg-slate-800 rounded-xl text-white uppercase tracking-wider"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
