import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";
import { AiOutlineEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal/Modal";
import LoadingSmall from "../components/Loading/LoadingSmall";

const Profile = () => {
  //AUTH CONTEXT
  const { user, dispatch, error, loading } = useContext(AuthContext);
  let navigate = useNavigate();
  const initialForm = {
    desc: "",
  };
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isOpen, OpenModal, CloseModal] = useModal(false);
  const [isOpenS, OpenModalS, CloseModalS] = useModal(false);

  //LOGOUT
  const handleLogout = async () => {
    try {
      await axios.get("https://mernstacke.herokuapp.com/auth/logout");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "ERROR" });
      navigate("/profile");
    }
  };

  //ONCHANGE IMAGE
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  //ONSUBMIT IMAGE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://mernstacke.herokuapp.com/users/upload/${user._id}`,
        {
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({ type: "SUCCESS", payload: res.data });
      CloseModal();
    } catch (error) {
      let err = "";
      if (error.response.statusText.length > 15) {
        err = "ERROR";
      } else {
        err = error.response.statusText;
      }
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || err,
      });
    }
  };

  //ON CHANGE PROFILE

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  //ONSUBMIT PROFILE

  const handleEdit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const res = await axios.put(
        `https://mernstacke.herokuapp.com/users/${user._id}`,
        {
          desc: form.desc,
        }
      );
      setUploading(false);
      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (error) {
      let err = "";
      if (error.response.statusText.length > 15) {
        err = "ERROR";
      } else {
        err = error.response.statusText;
      }
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || err,
      });
      setUploading(false);
    }
    setForm(initialForm);
  };
  return (
    <div className="min-h-screen h-auto w-full bg-slate-50 flex flex-col justify-start items-center">
      <h2 className="capitalize font-bold text-4xl text-center my-10">
        Your profile
      </h2>
      <div className="relative">
        {loading ? (
          <LoadingSmall className="mt-4" />
        ) : (
          <img
            src={user.image}
            alt={user.username}
            className="w-72 h-72 rounded-full ring-4 ring-gray-700 "
          />
        )}
        <button
          onClick={OpenModal}
          className="w-10 h-10 absolute top-60 right-12 bg-slate-50 ring-1  ring-gray-500 rounded-full p-2 flex items-center justify-center"
        >
          <AiOutlineEdit className="text-5xl font-bold cursor-pointer " />
        </button>
        {error && <Error>{`${error}`}</Error>}

        <Modal isOpen={isOpen} CloseModal={CloseModal}>
          <h1 className="uppercase font-bold text-xl text-center my-6 mt-8">
            Upload your image
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full h-full items-center justify-center"
          >
            <label
              htmlFor="file"
              className="w-56 flex py-3 justify-between px-8 bg-cyan-800 text-white rounded-xl cursor-pointer"
            >
              <AiOutlineCloudUpload className="text-2xl" />
              Choose a Photo
            </label>
            <input
              type="file"
              name="image"
              id="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
            {uploading ? (
              <LoadingSmall />
            ) : (
              <button
                type="submit"
                disabled={!image}
                className="disabled:opacity-75 py-2 px-4 my-2 mt-6 ring-2 ring-transparent bg-slate-800 rounded-xl text-white uppercase tracking-wider"
              >
                Upload
              </button>
            )}
          </form>
        </Modal>
      </div>
      {loading ? (
        <LoadingSmall />
      ) : (
        <>
          <h1 className="capitalize font-bold text-2xl text-center my-9">
            {user.username}
          </h1>
          {user.desc && (
            <>
              <p className="w-3/5 mx-auto text-center">{user.desc}</p>
            </>
          )}
        </>
      )}
      <h2 className="font-bold text-3xl text-center my-10">Settings</h2>
      <h3 className="font-bold text-xl text-center">
        Here you can edit your credentials.
      </h3>
      <button
        onClick={OpenModalS}
        className="py-2 px-4 ring-2 ring-slate-800 rounded-xl uppercase tracking-wider my-8 text-slate-800"
      >
        Edit Profile
      </button>
      <Modal isOpen={isOpenS} CloseModal={CloseModalS}>
        <h2 className="capitalize font-bold text-2xl text-center mt-4">
          Edit Profile
        </h2>
        <form
          onSubmit={handleEdit}
          className="flex flex-col items-center space-y-6 w-full"
        >
          <textarea
            name="desc"
            placeholder="Description"
            autoComplete="off"
            value={form.desc}
            maxLength="150"
            onChange={handleChange}
            className="py-2 ring-2 ring-slate-500 rounded-lg resize-none w-full placeholder:text-center"
          />

          {uploading ? (
            <LoadingSmall />
          ) : (
            <button
              type="submit"
              onClick={CloseModalS}
              className="disabled:opacity-75 py-2 px-4 ring-2 ring-transparent bg-slate-800 rounded-xl text-white uppercase tracking-wider"
            >
              Confirm
            </button>
          )}
        </form>
      </Modal>
      <Link
        to="/"
        onClick={handleLogout}
        className="py-2 px-4 mb-8 ring-2 ring-transparent bg-slate-800 rounded-xl text-white uppercase tracking-wider"
      >
        LogOut
      </Link>
      {loading && <Loading />}
    </div>
  );
};

export default Profile;
