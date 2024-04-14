import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  createPaymentType,
  deletePaymentTypeById,
  getAllPaymentTypes,
} from '../services/payment-type.service';

const router = Router();

router.post(
  '/payment-type',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentType } = req.body;

      if (!paymentType) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const newPaymentType = await createPaymentType(paymentType);

      res.json({
        paymentType: newPaymentType,
        success: true,
        message: 'Payment type created successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/payment-types',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentTypes = await getAllPaymentTypes();

      res.json({
        paymentTypes,
        success: true,
        message: 'Payment types retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/payment-type/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // Check if ID is provided
      if (!id) {
        return res.status(400).json({ error: 'Missing ID parameter' });
      }

      await deletePaymentTypeById(id);

      res.json({
        success: true,
        message: 'Payment type deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
