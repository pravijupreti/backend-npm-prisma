import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Example2 from './example2';  // Component displaying the user list
import { getUsers } from './getuser';  // Function that fetches users from DB
import { GetServerSideProps } from "next";

type User = {
  id: string;
  email: string;
  fullName: string;
  address: string;
};

type Props = {
  users: User[];
};

const Insert = ({ users }: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [userList, setUserList] = useState<User[]>(users); // Users list in state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { name, email, password, address };

    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMessage('User created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setAddress('');

        // Add the new user to the list directly
        const newUser = await response.json();  // Get the new user object from the API response
        setUserList((prevUsers) => [...prevUsers, newUser]); // Update state with new user
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      setMessage('Error creating user');
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Create New User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create User
          </button>
        </form>

        {message && <p className={`mt-4 text-center text-lg ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      </div>

      <div>
        {/* Pass the updated user list to Example2 */}
        <Example2 users={userList} />
      </div>
    </div>
  );
};

// Fetch users in getServerSideProps and pass them to the component
export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getUsers();  // Fetch users once here
  return {
    props: {
      users, // Pass the users fetched
    },
  };
};

export default Insert;
