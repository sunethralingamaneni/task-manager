'use client';

import { useState } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post(
        '/auth/login',
        {
          email,
          password,
        },
      );

      localStorage.setItem(
        'token',
        response.data.access_token,
      );

      router.push('/projects');
    } catch (error) {
      console.log(error);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          className="w-full border p-3 mb-4 rounded"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full border p-3 mb-4 rounded"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}