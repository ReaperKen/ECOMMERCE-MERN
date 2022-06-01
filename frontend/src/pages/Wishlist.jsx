import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Wishlist = () => {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { wishlist } = user;

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className="min-h-screen h-auto w-full flex flex-col items-center">
      <h1 className="text-2xl mt-8">
        Your Wishlist <span className="font-bold">{user.username}</span>!
      </h1>

      <section className="w-11/12 h-auto mx-auto shadow p-4 bg-white m-6 mt-12">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
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
    </div>
  );
};

export default Wishlist;
