import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import LoadingSmall from "../components/Loading/LoadingSmall";
import { AuthContext } from "../context/AuthContext";

const Shop = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { error, dispatch } = useContext(AuthContext);
  useEffect(() => {
    if (category.length > 0) {
      const getData = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `https://mernstacke.herokuapp.com/products/search?category=${category}`
          );
          setData([...res.data]);
          setLoading(false);
        } catch (error) {
          dispatch({ type: "ERROR", payload: error });
          setLoading(false);
        }
      };
      getData();
    } else {
      const getData = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `https://mernstacke.herokuapp.com/products/`
          );
          setData([...res.data]);
          setLoading(false);
        } catch (error) {
          dispatch({ type: "ERROR", payload: error.message });
          setLoading(false);
        }
      };
      getData();
    }
  }, [category, dispatch]);
  let navigate = useNavigate();
  const handleProduct = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center ">
      <h1 className="font-bold text-2xl mb-6">All categories</h1>
      <select
        className="w-40 bg-gray-800 text-white font-bold outline-none p-2 px-4 rounded-lg text-center cursor-pointer"
        name="Categories"
        id=""
        onChange={(e) => setCategory(e.target.value)}
      >
        <option
          value=""
          className="w-40 bg-gray-800 text-white font-bold outline-none p-2 px-4 rounded-lg text-center"
        >
          All
        </option>
        <option
          value="Computers"
          className="w-40 bg-gray-800 text-white font-bold outline-none p-2 px-4 rounded-lg text-center"
        >
          Computers
        </option>
        <option
          value="Cellphones"
          className="w-40 bg-gray-800 text-white font-bold outline-none p-2 px-4 rounded-lg text-center"
        >
          Cellphones
        </option>
        <option
          value="Groceries"
          className="w-40 bg-gray-800 text-white font-bold outline-none p-2 px-4 rounded-lg text-center"
        >
          Groceries
        </option>
        <option
          value="Clothes"
          className="w-40 bg-gray-800 text-white font-bold outline-none p-2 px-4 rounded-lg text-center"
        >
          Clothes
        </option>
      </select>
      {loading ? (
        <LoadingSmall />
      ) : error ? (
        <Error>{error.message || "ERROR"}</Error>
      ) : (
        <section className="h-auto bg-slate-100">
          <h2 className="text-center text-4xl my-8 font-bold text-black">
            {category || "All"}
          </h2>
          <article className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 my-4 p-4 gap-4 h-auto mx-auto place-items-center">
            {data.length > 0 &&
              data.map((item) => (
                <div
                  onClick={() => handleProduct(item._id)}
                  key={item._id}
                  className="shadow-md rounded w-44 h-52 lg:w-56 lg:h-64 flex items-center p-2 flex-col bg-white cursor-pointer"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-28 mb-2 lg:h-32"
                  />
                  <hr className="w-full" />
                  <div className="flex mt-auto flex-col w-full ">
                    <h3 className="font-bold text-xl ml-1 mt-1">
                      ${item.price}
                    </h3>
                    <p className="text-base ml-1 mb-1">{item.name}</p>
                  </div>
                </div>
              ))}
          </article>
          {data.length <= 0 && (
            <div className="w-full mx-auto text-center flex justify-center bg-slate-200 p-4 rounded-md">
              <p className="font-bold">Nothing here yet.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Shop;
