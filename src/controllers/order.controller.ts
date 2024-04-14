import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  createOrder,
  deleteOrder,
  getOrder,
  updateOrder,
} from '../services/order.service';

const router = Router();

router.get(
  '/orders',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posType = req.query?.posType as string;
      const userId = req.body.userId;
      const page = parseInt(req.query?.page as string) || 1;
      const pageSize = parseInt(req.query?.pageSize as string) || 10;

      if (!userId || !posType || !page || !pageSize) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const orders = await getOrder(userId, page, pageSize, posType);

      res.json({
        orders,
        success: true,
        message: 'Orders retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/order',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, totalAmount, items, posType, paymentType } = req.body;

      if (
        !userId ||
        !totalAmount ||
        !items ||
        items.length === 0 ||
        !posType ||
        !paymentType
      ) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const newOrder = await createOrder({
        paymentType,
        posType,
        userId,
        totalAmount,
        items,
      });

      res.json({
        order: newOrder,
        success: true,
        message: 'Order created successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/order/:orderId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.orderId;
      const { totalAmount, itemsToDelete } = req.body;

      if (!orderId || (!totalAmount && !itemsToDelete)) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const updatedOrder = await updateOrder(
        orderId,
        totalAmount,
        itemsToDelete,
      );

      res.json({
        order: updatedOrder,
        success: true,
        message: 'Order updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/order/:orderId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.orderId;

      if (!orderId) {
        return res.status(400).json({ error: 'Missing orderId parameter' });
      }

      const deletedOrder = await deleteOrder(orderId);

      res.json({
        order: deletedOrder,
        success: true,
        message: 'Order deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
