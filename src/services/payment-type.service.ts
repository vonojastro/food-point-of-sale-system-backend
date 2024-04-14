import { PrismaClient } from '@prisma/client';
import { PaymentType } from '../models/payment-type.model';

const prisma = new PrismaClient();

export async function createPaymentType(paymentType: PaymentType) {
  try {
    const newPaymentType = await prisma.paymentType.create({
      data: {
        paymentType: paymentType.paymentType,
      },
    });

    return newPaymentType;
  } catch (error) {
    throw error;
  }
}

export async function getAllPaymentTypes() {
  try {
    const paymentTypes = await prisma.paymentType.findMany();
    return paymentTypes;
  } catch (error) {
    throw error;
  }
}

export async function deletePaymentTypeById(id: string) {
  try {
    await prisma.paymentType.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
}
