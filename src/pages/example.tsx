import { prisma } from '../../lib/prisma'
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from 'react'
import CoolTable from './example2';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page({ user }: Props) {
  // State to manage the form input for new users
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    password: '',
    address: ''
  });

  // State to manage the list of users (including the fetched one)
  const [userList, setUserList] = useState<Props['user'][]>(user ? [user] : []);

  // Handle form submission to create a new user
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send a POST request to the server to create a new user
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const addedUser = await response.json();
      setUserList((prevList) => [...prevList, addedUser]);
      setNewUser({ email: '', name: '', password: '', address: '' }); // Reset form
    } else {
      console.error('Failed to add user');
    }
  };

  return (
    <main>
      <h1>User Information</h1>

      {/* Display a message if no user is found */}
      {userList.length === 0 ? (
        <p>Database is empty. Add a new user below:</p>
      ) : (
        <div>
          <h2>Existing Users:</h2>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch the first user (if any)
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com',
    },
  });

  return {
    props: {
      user,
    },
  };
};
