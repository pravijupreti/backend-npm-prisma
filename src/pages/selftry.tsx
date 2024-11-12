// pages/example2.tsx
import { GetServerSideProps } from "next";
import Example2 from "./example2";  // Make sure the component is imported with an uppercase
import { getUsers } from "./getuser";

// Define the type for each user
type User = {
  id: string;
  email: string;
  fullName: string;
  address: string;
};

type Props = {
  users: User[];
};

// Fetch users in getServerSideProps and pass them to the component
export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getUsers(); // Fetch users once here

  return {
    props: {
      users,  // Pass the users fetched
    },
  };
};

// The parent page component
const SelfTry = ({ users }: Props) => {
  return (
    <div>
      <h1>User List</h1>
      <Example2 users={users} /> {/* Pass users as props to Example2 */}
    </div>
  );
};

export default SelfTry;
