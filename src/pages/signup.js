import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import LoginPage from './login';
function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (data.token) {
        Cookies.set('token', data.token);
        router.push('/');
      } else {
        setError('Error creating user');
      }
    } catch (error) {
      setError('Error creating user');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Signup</button>
        {error && <div style={{color: 'ed' }}>{error}</div>}
      </form>
    </div>
  );
}

export default SignupPage;