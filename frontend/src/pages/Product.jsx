import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CartContext } from "../context/CartContext";
import { BsBookmarkCheck, BsBookmarkPlus } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import Error from "../components/Error/Error";

const Product = () => {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState("");
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(false);
  const { dispatch } = useContext(CartContext);
  const { user, error, dispatch: userDispatch } = useContext(AuthContext);
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const { wishlist } = user;
    const res = wishlist.find((item) => item._id === id);
    if (!res) {
      setWish(false);
    } else {
      setWish(true);
    }
  }, [id, user]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://mernstacke.herokuapp.com/products/find/${id}`
        );
        setData({ ...res.data });
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
    getData();
  }, [id, dispatch]);
  const handleSelect = (e) => {
    setSelect(e.target.value);
  };
  const addToCart = (id) => {
    const product = data;
    dispatch({ type: "ADD", payload: product });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };
  const handleCreateWish = async () => {
    try {
      const res = await axios.put(
        `https://mernstacke.herokuapp.com/products/wish/${user._id}/${id}`
      );
      setWish(true);
      userDispatch({ type: "SUCCESS", payload: res.data });
    } catch (error) {
      setWish(false);
      userDispatch({ type: "ERROR", payload: error });
    }
  };
  const handleDelWish = async () => {
    try {
      const res = await axios.put(
        `https://mernstacke.herokuapp.com/products/wishdel/${user._id}/${id}`
      );
      setWish(false);
      userDispatch({ type: "SUCCESS", payload: res.data });
    } catch (error) {
      setWish(false);
      userDispatch({ type: "ERROR", payload: error });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white">
      <div className="w-full flex justify-between">
        <span
          className="bg-gray-800 p-2 rounded-full m-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack className="text-3xl text-white" />
        </span>
        {wish ? (
          <span className="bg-white p-2 rounded-full m-4 cursor-pointer">
            <BsBookmarkCheck
              className="text-3xl  text-green-600"
              onClick={handleDelWish}
            />
          </span>
        ) : (
          <span className="bg-white p-2 rounded-full m-4 cursor-pointer">
            <BsBookmarkPlus
              className="text-3xl text-black"
              onClick={handleCreateWish}
            />
          </span>
        )}
      </div>
      <h1 className="text-3xl font-bold text-center mt-8">{data.name}</h1>
      <img
        src={data.images}
        alt={data.name}
        className="w-72 h-60 mt-12 shadow-lg md:w-96 md:h-72"
      />
      <div className="flex flex-col items-start w-11/12 mx-auto mt-8 space-y-2 mb-8 md:w-9/12">
        <h2 className="font-bold text-2xl">${data.price}</h2>
        <p className="text-xl text-gray-500">{data.desc}</p>
        <p className="text-xl text-gray-500">Color:</p>
        {data.colors?.length > 0 ? (
          <>
            <select
              name="Color"
              onChange={handleSelect}
              className="border-2 border-gray-500 ml-4"
            >
              <option>----</option>
              {data.colors.length > 0 &&
                data.colors.map((item, i) => (
                  <option value={data.colors[i]} key={i}>
                    {data.colors[i]}
                  </option>
                ))}
            </select>
          </>
        ) : (
          <p className="text-xl text-gray-500">Not available</p>
        )}
        <p className="text-xl text-gray-500 mt-2">
          Category:{" "}
          <span className="font-bold text-black">{data.category}</span>
        </p>
      </div>
      {error && <Error>{`${error}`}</Error>}
      <div className="w-full flex items-center justify-center  my-6 mt-auto relative">
        <button
          onClick={addToCart}
          className="bg-gray-800 w-4/5 mx-auto mt-auto py-3 mb-8 rounded-lg text-white font-bold text-xl"
        >
          Add to cart
        </button>
        {added && (
          <div className="flex flex-col items-center justify-center absolute w-40 h-10 bg-green-600 top-14 rounded-lg">
            <p className="text-white font-bold text-lg">Added to cart</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Product;
