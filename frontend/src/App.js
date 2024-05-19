import Login from "./Login.js";

// import { useAuthContext } from "../backend/hooks/useAuthContext.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup.js";
import Homepage from "./homepage.js";
import ProductList from "./Products.js";
import Orders from "./orders/orders.js";
import Details from "./details/details.js";
import Transactions from "./transactions/transaction.js";

function App() {
  // const { user } = useAuthContext();
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="products" element={<ProductList/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="signup" element={<Signup/>}></Route>
      <Route path="details" element={<Details/>}/>
      <Route path="transaction" element={<Transactions/>}/>
      </Routes></BrowserRouter>
    
  );
}

export default App;
