import { PrismaClient } from '@prisma/client';
import { CashAdded, Expense } from '../models/cash.model';
const prisma = new PrismaClient();

export async function getExpenses(
  userId: string,
  page: number,
  pageSize: number,
) {
  try {
    const skip = (page - 1) * pageSize;
    const expenses = await prisma.expense.findMany({
      where: {
        userId: userId,
      },
      skip: skip,
      take: pageSize,
      orderBy: { createdAt: 'asc' },
    });

    return expenses;
  } catch (error) {
    throw error;
  }
}

export async function createExpense(expenseData: Expense) {
  try {
    const newExpense = await prisma.expense.create({
      data: {
        posType: expenseData.posType,
        amount: expenseData.amount,
        description: expenseData.description,
        subDescription: expenseData.subDescription,
      },
    });

    return newExpense;
  } catch (error) {
    throw error;
  }
}

export async function deleteExpense(expenseId: string) {
  try {
    const deletedExpense = await prisma.expense.delete({
      where: {
        expenseId: expenseId,
      },
    });

    return deletedExpense;
  } catch (error) {
    throw error;
  }
}

export async function updateExpense(expenseId: string, expenseData: Expense) {
  try {
    const updatedExpense = await prisma.expense.update({
      where: {
        expenseId: expenseId,
      },
      data: expenseData,
    });

    return updatedExpense;
  } catch (error) {
    throw error;
  }
}

export async function createCashAdded(cashAddedData: CashAdded) {
  try {
    const newCashAdded = await prisma.cashAdded.create({
      data: {
        posType: cashAddedData.posType,
        userId: cashAddedData.userId,
        amount: cashAddedData.amount,
        description: cashAddedData.description,
        subDescription: cashAddedData.subDescription,
      },
    });

    return newCashAdded;
  } catch (error) {
    throw error;
  }
}

export async function getCashAddedEntries(
  userId: string,
  page: number,
  pageSize: number,
) {
  try {
    const skip = (page - 1) * pageSize;
    const cashAddedEntries = await prisma.cashAdded.findMany({
      where: {
        userId: userId,
      },
      skip: skip,
      take: pageSize,
      orderBy: { createdAt: 'asc' },
    });

    return cashAddedEntries;
  } catch (error) {
    throw error;
  }
}

export async function deleteCashAdded(incomeId: string) {
  try {
    await prisma.cashAdded.delete({
      where: {
        incomeId: incomeId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function updateCashAdded(
  incomeId: string,
  cashAddedData: CashAdded,
) {
  try {
    const updatedCashAdded = await prisma.cashAdded.update({
      where: {
        incomeId: incomeId,
      },
      data: cashAddedData,
    });

    return updatedCashAdded;
  } catch (error) {
    throw error;
  }
}
