import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  createEmployee,
  deleteEmployee,
  getEmployeeByName,
  getEmployees,
  updateEmployee,
} from '../services/employee.service';

const router = Router();
router.get(
  '/employees',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body?.userId;
      const page = parseInt(req.query?.page as string) || 1;
      const pageSize = parseInt(req.query?.pageSize as string) || 10;

      if (!userId) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const employees = await getEmployees(userId, page, pageSize);

      if (!employees) {
        return res
          .status(404)
          .json({ errors: 'No data found for the provided userId.' });
      }

      res.json({
        employees,
        success: true,
        message: 'Employees fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/employee',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        employeeName,
        position,
        dateHired,
        isHired,
        email,
        password,
        userId,
      } = req.body;

      if (
        !employeeName ||
        !position ||
        !dateHired ||
        !email ||
        !password ||
        !userId
      ) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const existing = await getEmployeeByName(employeeName);

      if (existing) {
        return res
          .status(400)
          .json({ error: 'Employee with the same name already exists' });
      }

      const newEmployee = await createEmployee({
        userId,
        password,
        email,
        employeeName,
        position,
        dateHired: new Date(dateHired),
        isHired,
      });

      res.json({
        employee: newEmployee,
        success: true,
        message: 'Employee created successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/employee/:id',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { employeeName, position, dateHired, isHired } = req.body;

      if (!employeeName || !position || !dateHired) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const existingEmployee = await getEmployeeByName(employeeName);

      if (existingEmployee && existingEmployee.id !== id) {
        return res
          .status(400)
          .json({ error: 'Employee with the same name already exists' });
      }

      const updatedEmployee = await updateEmployee(id, {
        employeeName,
        position,
        dateHired: new Date(dateHired),
        isHired,
      });

      res.json({
        employee: updatedEmployee,
        success: true,
        message: 'Employee updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/employee/:id',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedEmployee = await deleteEmployee(id);

      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      res.json({
        success: true,
        message: 'Employee deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
