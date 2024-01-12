import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProductLayout from "./pages/Layouts/ProductLayout";
import CategoryLayout from "./pages/Layouts/CategoryLayout";
import TransactionsLayout from "./pages/Layouts/TransactionsLayout";
import SuppliersLayout from "./pages/Layouts/SuppliersLayout";
import ClientLayout from "./pages/Layouts/ClientLayout";
import Hero from "./pages/container/hero";
import { useSelector } from "react-redux";
import Error from "./pages/components/error";
import Home from "./pages/container/home";
import ReceiptLayout from "./pages/Layouts/ReceiptLayout";
function App() {
  const userState = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Homepage />}>
            {userState.userInfo ? (
              <>
                <Route
                  path="/home/products"
                  element={<ProductLayout />}
                ></Route>
                <Route
                  path="/home/categories"
                  element={<CategoryLayout />}
                ></Route>
                <Route
                  path="/home/transactions"
                  element={<TransactionsLayout />}
                ></Route>
                <Route path="/home" element={<Hero />}></Route>
                <Route
                  path="/home/suppliers"
                  element={<SuppliersLayout />}
                ></Route>
                <Route path="/home/clients" element={<ClientLayout />}></Route>
                <Route path="/home/receipt" element={<ReceiptLayout />}></Route>
              </>
            ) : (
              <Route path="/home/error" element={<Error />}></Route>
            )}
          </Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
