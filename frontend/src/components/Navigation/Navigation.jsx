import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";

const Navigation = () => {
  const [nav, setNav] = useState(false);
  const { user } = useContext(AuthContext);
  const handleTop = () => {
    setNav(false);
    window.scrollTo(0, 0);
  };
  return (
    <nav className="w-full flex items-center justify-between h-16 z-10">
      <span className="mx-4 ml-8 uppercase font-bold tracking-wide cursor-pointer">
        Ken
      </span>

      <button
        onClick={() => setNav(!nav)}
        className="ml-4 flex items-center mr-8"
      >
        <FaBars className="text-2xl font-bold cursor-pointer" />
      </button>

      {nav ? (
        <div className="w-2/3 bg-white/75 backdrop-blur-lg min-h-screen z-50 flex flex-col items-center justify-between right-0 top-0 fixed">
          <div className="flex mt-10  justify-evenly w-full">
            {user ? (
              <Link
                to="/profile"
                onClick={handleTop}
                className="flex items-center justify-center text-white text-xl bg-black rounded-full p-2"
              >
                <img
                  src={user.image}
                  alt={user.username}
                  className="rounded-full w-10 h-10 "
                />
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={handleTop}
                className="flex items-center text-white text-xl bg-black rounded-full p-2 px-4"
              >
                <BiUserCircle className="text-2xl  text-white" />
                Login
              </Link>
            )}
            <Link
              to="/shopcart"
              onClick={handleTop}
              className="bg-black flex items-center justify-center rounded-full px-4 py-2 "
            >
              <AiOutlineShoppingCart className="text-2xl text-white" />
            </Link>
            {nav && (
              <button
                onClick={() => setNav(!nav)}
                className="bg-black z-10 flex items-center justify-center rounded-full px-4 py-2"
              >
                <IoMdClose className="text-2xl font-bold text-white cursor-pointer" />
              </button>
            )}
          </div>

          <Link
            to="/"
            className="text-black text-xl tracking-wider"
            onClick={handleTop}
          >
            HOME
          </Link>
          <Link
            to="/shop"
            className="text-black text-xl tracking-wider"
            onClick={handleTop}
          >
            SHOP
          </Link>
          <Link
            to="/wishlist"
            className="text-black text-xl tracking-wider"
            onClick={handleTop}
          >
            WISHLIST
          </Link>
          <Link
            to="/faq"
            className="text-black text-xl mb-14 tracking-wider"
            onClick={handleTop}
          >
            FAQ
          </Link>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </nav>
  );
};

export default Navigation;
