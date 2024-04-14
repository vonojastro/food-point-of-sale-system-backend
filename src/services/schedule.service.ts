import { PrismaClient } from '@prisma/client';
import { EmployeeAttendance, ScheduleDefault } from '../models/schedule.model';

const prisma = new PrismaClient();

export async function createEmployeeAttendance(
  employeeAttendanceData: EmployeeAttendance,
) {
  try {
    const newEmployeeAttendance = await prisma.employeeAttendance.create({
      data: {
        posType: employeeAttendanceData.posType,
        userId: employeeAttendanceData.userId,
        employeeId: employeeAttendanceData.employeeId,
        date: new Date(employeeAttendanceData.date), // Convert to Date object
        startTime: new Date(employeeAttendanceData.startTime), // Combine with a default date to create a valid Date object
        endTime: new Date(employeeAttendanceData.endTime), // Combine with a default date to create a valid Date object
        status: employeeAttendanceData.status,
        remarks: employeeAttendanceData.remarks,
      },
    });

    return newEmployeeAttendance;
  } catch (error) {
    throw error;
  }
}

export async function createScheduleDefault(
  scheduleDefaultData: ScheduleDefault,
) {
  try {
    const newScheduleDefault = await prisma.scheduleDefault.create({
      data: {
        posType: scheduleDefaultData.posType,
        userId: scheduleDefaultData.userId,
        scheduleName: scheduleDefaultData.scheduleName,
        description: scheduleDefaultData.description,
        startTime: scheduleDefaultData.startTime,
        endTime: scheduleDefaultData.endTime,
        daysOfWeek: scheduleDefaultData.daysOfWeek,
      },
    });

    return newScheduleDefault;
  } catch (error) {
    throw error;
  }
}

export async function getEmployeeAttendanceById(attendanceId: string) {
  try {
    const employeeAttendance = await prisma.employeeAttendance.findUnique({
      where: {
        attendanceId,
      },
    });

    return employeeAttendance;
  } catch (error) {
    throw error;
  }
}

export async function getScheduleDefaultById(ruleId: string) {
  try {
    const scheduleDefault = await prisma.scheduleDefault.findUnique({
      where: {
        ruleId,
      },
    });

    return scheduleDefault;
  } catch (error) {
    throw error;
  }
}

export async function updateEmployeeAttendance(
  attendanceId: string,
  employeeAttendanceData: Partial<EmployeeAttendance>,
) {
  try {
    const updatedEmployeeAttendance = await prisma.employeeAttendance.update({
      where: { attendanceId },
      data: employeeAttendanceData,
    });

    return updatedEmployeeAttendance;
  } catch (error) {
    throw error;
  }
}

export async function updateScheduleDefault(
  ruleId: string,
  scheduleDefaultData: Partial<ScheduleDefault>,
) {
  try {
    const updatedScheduleDefault = await prisma.scheduleDefault.update({
      where: { ruleId },
      data: scheduleDefaultData,
    });

    return updatedScheduleDefault;
  } catch (error) {
    throw error;
  }
}
