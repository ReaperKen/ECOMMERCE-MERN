import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import { AuthContext } from "./context/AuthContext";
import FAQ from "./pages/FAQ";
import Homepage from "./pages/Home.page";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ShopingCart from "./pages/ShopingCart";
import Wishlist from "./pages/Wishlist";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/shopcart"
          element={user ? <ShopingCart /> : <Navigate to="/login" />}
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/product/:id"
          element={user ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/wishlist"
          element={user ? <Wishlist /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
