import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  createCashAdded,
  createExpense,
  deleteCashAdded,
  deleteExpense,
  getCashAddedEntries,
  getExpenses,
  updateCashAdded,
  updateExpense,
} from '../services/cash.service';

const router = Router();

router.post(
  '/expense',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount, description, subDescription, userId, posType } = req.body;

      if (!amount || !description || !userId) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const newExpense = await createExpense({
        posType,
        userId,
        amount,
        description,
        subDescription,
      });

      res.json({
        expense: newExpense,
        success: true,
        message: 'Expense created successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/expenses',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body?.userId;
      const page = parseInt(req.query?.page as string) || 1;
      const pageSize = parseInt(req.query?.pageSize as string) || 10;

      if (!userId) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const expenses = await getExpenses(userId, page, pageSize);

      if (!expenses) {
        return res
          .status(404)
          .json({ errors: 'No expenses found for the provided userId.' });
      }

      res.json({
        expenses,
        success: true,
        message: 'Expenses fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/expenses/:expenseId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId = req.params.expenseId;
      const userId = req.body?.userId;
      if (!expenseId || !userId) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const deletedExpense = await deleteExpense(expenseId);

      if (!deletedExpense) {
        return res.status(404).json({ errors: 'Expense not found.' });
      }

      res.json({
        success: true,
        message: 'Expense deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/expenses/:expenseId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId = req.params.expenseId;
      const { amount, description, subDescription, userId, posType } = req.body;

      if (
        !expenseId ||
        !userId ||
        (!amount && !description && !subDescription && !posType)
      ) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const updatedExpense = await updateExpense(expenseId, {
        posType,
        amount,
        description,
        subDescription,
      });

      res.json({
        expense: updatedExpense,
        success: true,
        message: 'Expense updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/cash-added',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, amount, description, subDescription, posType } = req.body;

      if (!amount || !description) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const newCashAdded = await createCashAdded({
        posType,
        userId,
        amount,
        description,
        subDescription,
      });

      res.json({
        cashAdded: newCashAdded,
        success: true,
        message: 'Cash added successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/cash-added',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.query.userId as string | undefined;
      const page = parseInt(req.query?.page as string) || 1;
      const pageSize = parseInt(req.query?.pageSize as string) || 10;
      if (!userId) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const cashAddedEntries = await getCashAddedEntries(
        userId,
        page,
        pageSize,
      );

      if (!cashAddedEntries) {
        return res.status(404).json({
          errors: 'No cash added entries found for the provided userId.',
        });
      }

      res.json({
        cashAddedEntries,
        success: true,
        message: 'Cash added entries fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/cash-added/:incomeId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incomeId = req.params.incomeId;
      const { userId } = req.body;
      if (!incomeId || !userId) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      await deleteCashAdded(incomeId);

      res.json({
        success: true,
        message: 'Cash added entry deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/cash-added/:incomeId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incomeId = req.params.incomeId;
      const { userId, amount, description, subDescription, posType } = req.body;

      if (
        !incomeId ||
        !userId ||
        (!amount && !description && !subDescription && !posType)
      ) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const updatedCashAdded = await updateCashAdded(incomeId, {
        posType,
        userId,
        amount,
        description,
        subDescription,
      });

      res.json({
        cashAdded: updatedCashAdded,
        success: true,
        message: 'Cash added updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);
export default router;
