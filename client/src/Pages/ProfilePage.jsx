import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AccountNav from '../../components/AccountNav';
import PlacesPage from '../../components/PlacesPage';
import { UserContext } from '../../components/UserContext';

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(false);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  let navigate = useNavigate();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  async function Logout() {
    await axios.post('/logout');
    setRedirect(true);
    setUser(null);
  }

  useEffect(() => {
    if (redirect) {
      return navigate('/');
    }
  }, [redirect]);

  if (!ready) {
    return 'Loading....';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/Login'} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="mx-auto max-w-lg text-center">
          Logged in as {user?.name} ({user?.email}) <br />
          <button
            onClick={Logout}
            className="primary mt-2 max-w-sm"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
