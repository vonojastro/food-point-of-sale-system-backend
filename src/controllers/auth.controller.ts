import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import { createUser, login } from '../services/auth.service';

const router = Router();

router.post(
  '/user/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and sanitize request body
      const { email, username, password } = req.body;

      // Check for required fields
      if (!email || !username || !password) {
        return res
          .status(400)
          .json({
            errors: { message: 'Email, username, and password are required' },
          });
      }

      const user = await createUser(req.body);
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/user/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('req.body', req.body);
      const user = await login(req.body);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/user',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: 'success' });
    } catch (error) {
      next(error);
    }
  },
);

// router.put('/user', auth.required, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await updateUser(req.body.user, req.user?.username as string);
//     res.json({ user });
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
