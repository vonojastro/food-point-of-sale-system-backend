export interface RegisteredUser {
  id?: string;
  clerkId?: string;
  userType?: string;
  username?: string | null;
  email?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  token: string;
  password?: string | null;
}
