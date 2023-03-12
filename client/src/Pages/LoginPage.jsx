import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './../../components/UserContext';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  };

  useEffect(() => {
    if (redirect) {
      return navigate('/');
    }
  }, [redirect]);

  return (
    <div className="mt-4 flex grow items-center justify-around">
      <div className="mb-64">
        <h1 className="mb-4 text-center text-4xl">Login</h1>
        <form
          onSubmit={handleLogin}
          className="mx-auto max-w-md"
        >
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="primary"
            type="submit"
          >
            Login
          </button>
          <div className="py-2 text-center text-gray-500">
            <p>
              Don&apos;t have an account yet?{' '}
              <Link
                to={'/register'}
                className="text-black underline"
              >
                Register now
              </Link>{' '}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
