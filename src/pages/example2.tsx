// pages/index.tsx

import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import 'tailwindcss/tailwind.css';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

type User = {
  id: string;
  email: string;
  fullName: string;
  address: string;
};

type Props = {
  users: User[];
};

const Example2 = ({ users }: Props) => {
  const columns = users.length > 0 ? Object.keys(users[0]) : [];

  if (users.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full bg-white rounded-lg border-separate" style={{ borderSpacing: '0' }}>
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-left rounded-t-lg">
              {columns.map((column, index) => (
                <th key={index} className="py-3 px-6 font-semibold text-sm uppercase tracking-wider">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, rowIndex) => (
              <tr
                key={user.id}
                className={`${
                  rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } transition duration-200 ease-in-out hover:bg-blue-100`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-4 px-6 text-gray-800">
                    {user[column] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Example2;