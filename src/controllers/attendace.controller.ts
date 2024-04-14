import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  createEmployeeAttendance,
  createScheduleDefault,
  getEmployeeAttendanceById,
  getScheduleDefaultById,
  updateEmployeeAttendance,
  updateScheduleDefault,
} from '../services/schedule.service';

const router = Router();

router.post(
  '/employee-attendance',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        posType,
        userId,
        employeeId,
        date,
        startTime,
        endTime,
        status,
        remarks,
      } = req.body;

      if (
        !posType ||
        !employeeId ||
        !date ||
        !startTime ||
        !endTime ||
        !status
      ) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const newEmployeeAttendance = await createEmployeeAttendance({
        posType,
        userId,
        employeeId,
        date,
        startTime,
        endTime,
        status,
        remarks,
      });

      res.json({
        employeeAttendance: newEmployeeAttendance,
        success: true,
        message: 'Employee attendance added successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/schedule-default',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        posType,
        userId,
        scheduleName,
        description,
        startTime,
        endTime,
        daysOfWeek,
      } = req.body;

      if (
        !posType ||
        !scheduleName ||
        !description ||
        !startTime ||
        !endTime ||
        !daysOfWeek
      ) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const newScheduleDefault = await createScheduleDefault({
        posType,
        userId,
        scheduleName,
        description,
        startTime,
        endTime,
        daysOfWeek,
      });

      res.json({
        scheduleDefault: newScheduleDefault,
        success: true,
        message: 'Schedule default added successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/employee-attendance/:attendanceId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { attendanceId } = req.params;

      if (!attendanceId) {
        return res.status(400).json({ error: 'Attendance ID is required' });
      }

      const employeeAttendance = await getEmployeeAttendanceById(attendanceId);

      if (!employeeAttendance) {
        return res.status(404).json({ error: 'Employee attendance not found' });
      }

      res.json({
        employeeAttendance,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/schedule-default/:ruleId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ruleId } = req.params;

      if (!ruleId) {
        return res.status(400).json({ error: 'Rule ID is required' });
      }

      const scheduleDefault = await getScheduleDefaultById(ruleId);

      if (!scheduleDefault) {
        return res.status(404).json({ error: 'Schedule default not found' });
      }

      res.json({
        scheduleDefault,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/update-employee-attendance/:attendanceId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { attendanceId } = req.params;
      const {
        posType,
        userId,
        employeeId,
        date,
        startTime,
        endTime,
        status,
        remarks,
      } = req.body;

      if (!attendanceId || !userId) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const existingAttendance = await getEmployeeAttendanceById(attendanceId);

      if (!existingAttendance || existingAttendance.userId !== userId) {
        return res.status(404).json({ error: 'Attendance not found' });
      }

      // Update attendance
      const updatedAttendance = await updateEmployeeAttendance(attendanceId, {
        posType,
        userId,
        employeeId,
        date,
        startTime,
        endTime,
        status,
        remarks,
      });

      res.json({
        employeeAttendance: updatedAttendance,
        success: true,
        message: 'Employee attendance updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/update-schedule-default/:ruleId',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ruleId } = req.params;
      const {
        posType,
        userId,
        scheduleName,
        description,
        startTime,
        endTime,
        daysOfWeek,
      } = req.body;

      if (!ruleId || !userId) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const existingSchedule = await getScheduleDefaultById(ruleId);

      if (!existingSchedule || existingSchedule.userId !== userId) {
        return res.status(404).json({ error: 'Schedule default not found' });
      }

      const updatedSchedule = await updateScheduleDefault(ruleId, {
        posType,
        userId,
        scheduleName,
        description,
        startTime,
        endTime,
        daysOfWeek,
      });

      res.json({
        scheduleDefault: updatedSchedule,
        success: true,
        message: 'Schedule default updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
