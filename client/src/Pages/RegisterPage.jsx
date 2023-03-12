import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now You Can login');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  };
  return (
    <div className="mt-4 flex grow items-center justify-around">
      <div className="mb-64">
        <h1 className="mb-4 text-center text-4xl">Register</h1>
        <form
          className="mx-auto max-w-md"
          onSubmit={registerUser}
        >
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Register
          </button>
          <div className="py-2 text-center text-gray-500">
            <p>
              Already a member?{' '}
              <Link
                to={'/Login'}
                className="text-black underline"
              >
                Login
              </Link>{' '}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
