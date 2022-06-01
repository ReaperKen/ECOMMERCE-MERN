import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { HiTrash } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const ShopingCart = () => {
  const { user } = useContext(AuthContext);
  const { cart, dispatch } = useContext(CartContext);
  const handleDelete = (id, e) => {
    e.stopPropagation();
    dispatch({ type: "DELETE", payload: id });
  };
  const ClearCart = () => {
    dispatch({ type: "CLEAR" });
  };
  let navigate = useNavigate();
  const handleProduct = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className="min-h-screen h-auto w-full flex flex-col items-center">
      <h1 className="text-2xl mt-8">
        Welcome <span className="font-bold">{user.username}</span>!
      </h1>

      <section className="w-11/12 h-auto mx-auto shadow p-4 bg-white m-6 mt-12">
        {cart.length > 0 ? (
          cart.map((item) => (
            <article
              key={item._id}
              className="w-full mx-auto flex shadow p-2 my-2 cursor-pointer"
              onClick={() => handleProduct(item._id)}
            >
              <img src={item.images[0]} alt={item.name} className="w-32 h-24" />
              <div className="flex flex-col justify-end mb-2">
                <h3 className="font-bold text-lg ml-1 mt-1">${item.price}</h3>
                <p className="text-base ml-1 text-slate-600">{item.name}</p>
              </div>
              <div className="flex h-8 ml-auto">
                <HiTrash
                  onClick={(e) => handleDelete(item._id, e)}
                  className="text-3xl cursor-pointer z-10"
                />
              </div>
            </article>
          ))
        ) : (
          <div className="w-4/5 mx-auto text-center ">
            <p>
              Nothing here yet,{" "}
              <Link to="/" className="text-black font-bold underline">
                go add something!
              </Link>
            </p>
          </div>
        )}
      </section>
      {cart.length > 0 && (
        <button
          onClick={ClearCart}
          className="bg-gray-800 w-4/5 mx-auto mt-auto mb-10 py-3 rounded-lg text-white font-bold text-xl"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default ShopingCart;
