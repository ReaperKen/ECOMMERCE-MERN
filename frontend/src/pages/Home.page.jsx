import { useNavigate } from "react-router-dom";
import LoadingSmall from "../components/Loading/LoadingSmall";
import useFetch from "../hooks/useFetch";

const Homepage = () => {
  const { data, loading, error } = useFetch(
    "https://mernstacke.herokuapp.com/products/featured?featured=true&limit=16"
  );
  let navigate = useNavigate();
  const handleProduct = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className="bg-slate-100 w-full min-h-screen flex flex-col items-center justify-center">
      <section className="flex flex-col justify-center items-center w-full min-h-screen bg-hero-image bg-cover bg-center text-white">
        <h1 className="text-6xl text-center my-10 font-bold">Shoping</h1>
        <p className="text-3xl text-center w-1/2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
          assumenda.
        </p>
      </section>
      {loading ? (
        <LoadingSmall />
      ) : error ? (
        <p className="text-center text-3xl text-red-800">
          {error.response?.data?.message}
        </p>
      ) : (
        <section className="h-auto bg-slate-100">
          <h2 className="text-center text-4xl my-8 font-bold">Featured</h2>
          <article className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 my-4 p-4 gap-4 h-auto mx-auto place-items-center">
            {data?.map((item) => (
              <div
                onClick={() => handleProduct(item._id)}
                key={item._id}
                className="shadow-md rounded w-44 h-52 lg:w-48 lg:h-56  flex items-center p-2 flex-col bg-white cursor-pointer"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-28 mb-2 lg:h-32"
                />
                <hr className="w-full" />
                <div className="flex mt-auto flex-col w-full ">
                  <h3 className="font-bold text-xl ml-1 mt-1">${item.price}</h3>
                  <p className="text-lg ml-1">{item.name}</p>
                </div>
              </div>
            ))}
          </article>
        </section>
      )}
    </div>
  );
};

export default Homepage;
