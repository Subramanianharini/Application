import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 
import SignupPage  from './signup';
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        Cookies.set('token', data.token);
        router.push('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
        {error && <div style={{ color: 'ed' }}>{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;