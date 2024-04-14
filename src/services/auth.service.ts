import { PrismaClient } from '@prisma/client';
import { User } from '../models/user.model';

const prisma = new PrismaClient();

// Controller function for creating a new user
export async function createUser(userData: User) {
  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId: userData.clerkId,
        username: userData.username,
        password: userData.password,
        email: userData.email,
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}
