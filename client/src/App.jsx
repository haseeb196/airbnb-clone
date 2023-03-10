import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "../components/UserContext";


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = "true";
function App() {
  
 

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
