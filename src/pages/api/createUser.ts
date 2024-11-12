// pages/api/createUser.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, password, address } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          address,
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
