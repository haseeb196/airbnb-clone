import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from '../components/UserContext';
import './App.css';
import Layout from './Layout';
import Account from './Pages/Account';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = 'true';
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<IndexPage />}
          />
          <Route
            path="/Login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/account/:subpage?"
            element={<Account />}
          />
          <Route
            path="/account/:subpage/:action"
            element={<Account />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
