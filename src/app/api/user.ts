import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next'

// API route to handle user creation and fetching
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany(); // Fetch all users
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else if (req.method === 'POST') {
    const { email, name, password, address } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password,  // Remember to hash the password before saving in a real application
          address,
        },
      });
      res.status(201).json(newUser); // Return the newly created user
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
