import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import BookingPage from '../components/BookingPage';
import PlacePage from '../components/PlacePage';
import PlacesFormPage from '../components/PlacesFormPage';
import PlacesPage from '../components/PlacesPage';
import { UserContextProvider } from '../components/UserContext';
import './App.css';
import Layout from './Layout';
import BookingsPage from './Pages/BookingsPage';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
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
            path="/account"
            element={<ProfilePage />}
          />
          <Route
            path="/account/places"
            element={<PlacesPage />}
          />
          <Route
            path="/account/places/new"
            element={<PlacesFormPage />}
          />
          <Route
            path="/account/places/:id"
            element={<PlacesFormPage />}
          />
          <Route
            path="/place/:id"
            element={<PlacePage />}
          />
          <Route
            path="/account/bookings"
            element={<BookingsPage />}
          />
          <Route
            path="/account/bookings/:id"
            element={<BookingPage />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
