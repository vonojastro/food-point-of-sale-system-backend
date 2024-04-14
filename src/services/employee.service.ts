import { PrismaClient } from '@prisma/client';
import { Employee } from '../models/employee.model';

const prisma = new PrismaClient();

export async function getEmployees(
  userId: string,
  page: number,
  pageSize: number,
) {
  try {
    const skip = (page - 1) * pageSize;
    const existingEmployees = await prisma.user.findMany({
      where: {
        id: userId,
      },
      skip: skip,
      take: pageSize,
      orderBy: { createdAt: 'asc' },
    });

    return existingEmployees;
  } catch (error) {
    throw error;
  }
}

export async function getEmployeeByName(employeeName: string) {
  try {
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        employeeName: employeeName,
      },
    });

    return existingEmployee;
  } catch (error) {
    throw error;
  }
}

export async function createEmployee(employeeData: Employee) {
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        ...employeeData,
        email: employeeData.email ? employeeData.email : '',
      },
    });

    return newEmployee;
  } catch (error) {
    throw error;
  }
}

export async function updateEmployee(
  employeeId: string,
  employeeData: Partial<Employee>,
) {
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        ...employeeData,
        updatedAt: new Date(),
      },
    });

    return updatedEmployee;
  } catch (error) {
    throw error;
  }
}

export async function deleteEmployee(employeeId: string) {
  try {
    const deletedEmployee = await prisma.employee.delete({
      where: { id: employeeId },
    });

    return deletedEmployee;
  } catch (error) {
    throw error;
  }
}
