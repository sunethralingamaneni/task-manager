'use client';

import { useState } from 'react';
import api from '../../lib/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {
        email,
        password,
      });

      alert('User created');
    } catch (error) {
      console.log(error);
      alert('Register failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-3xl font-bold mb-6">
          Register
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
          onClick={handleRegister}
          className="w-full bg-black text-white p-3 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}