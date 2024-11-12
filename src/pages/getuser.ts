// lib/userService.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Utility function to get users from the database
export const getUsers = async () => {
  const usersFromDb = await prisma.user.findMany();
  return usersFromDb.map((user) => ({
    id: user.id,
    email: user.email,
    fullName: user.name,
    address: user.address,
  }));
};
