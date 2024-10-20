import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import HttpException from '../models/http-exception.model';
import generateToken from '../utils/token.utils';
import { RegisteredUser } from '../models/register-input.model';

const prisma = new PrismaClient();

const checkUserUniqueness = async (email: string, username: string) => {
  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  const existingUserByUsername = await prisma.user.findFirst({
    where: { username },
    select: { id: true },
  });

  if (existingUserByEmail || existingUserByUsername) {
    throw new HttpException(422, {
      errors: {
        ...(existingUserByEmail ? { email: ['has already been taken'] } : {}),
        ...(existingUserByUsername ? { username: ['has already been taken'] } : {}),
      },
    });
  }
};

export const createUser = async (input: RegisteredUser): Promise<RegisteredUser> => {
  const email = input.email?.trim();
  const username = input.username?.trim();
  const password = input.password?.trim();
  const userType = input.userType?.trim(); // Extract userType from input

  if (!email) {
    throw new HttpException(422, { errors: { email: ["can't be blank"] } });
  }

  if (!username) {
    throw new HttpException(422, { errors: { username: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  if (!userType) {
    throw new HttpException(422, { errors: { userType: ["can't be blank"] } }); // Check if userType is provided
  }

  await checkUserUniqueness(email, username);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      clerkId: `clerk_${Date.now()}`, // Generate a unique clerkId
      username,
      email,
      password: hashedPassword,
      userType, // Add userType here
    },
    select: {
      email: true,
      username: true,
    },
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const login = async (userPayload: any) => {
  const email = userPayload.email.trim();
  const password = userPayload.password.trim();

  if (!email) {
    throw new HttpException(422, { errors: { email: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      username: true,
      password: true, // Assuming this is stored securely
    },
  });

  if (user && user.password) { // Check if password is not null
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return {
        email: user.email,
        username: user.username,
        token: generateToken(user),
      };
    }
  }

  throw new HttpException(403, {
    errors: {
      'email or password': ['is invalid'],
    },
  });
};
