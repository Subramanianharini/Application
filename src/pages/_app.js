import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 

function APP2({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token');
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${tokenFromCookie}`,
        },
      })
       .then(response => response.json())
       .then(data => setUser(data))
       .catch(error => console.error(error));
    }
  }, []);

  useEffect(() => {
    if (!token && router.pathname!== '/login') {
      router.push('/login');
    }
  }, [token, router]);

  return <Component {...pageProps} user={user} />;
}

export default APP2;
