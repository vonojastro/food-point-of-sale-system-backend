import { PrismaClient } from '@prisma/client';

import { Order } from '../models/order.model';

const prisma = new PrismaClient();

export async function createOrder(orderData: Order) {
  try {
    const newOrder = await prisma.order.create({
      data: {
        ...orderData,
        createdAt: new Date(),
        updatedAt: new Date(),
        items: {
          create: orderData.items.map((item) => ({
            ...item,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return newOrder;
  } catch (error) {
    throw error;
  }
}

export async function getOrder(
  userId: string,
  page: number,
  pageSize: number,
  posType: string,
) {
  try {
    const skip = (page - 1) * pageSize;
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
        posType: posType,
      },
      skip: skip,
      take: pageSize,
      orderBy: { createdAt: 'asc' },
      include: {
        items: true,
      },
    });

    return orders;
  } catch (error) {
    throw error;
  }
}

export async function updateOrder(
  orderId: string,
  totalAmount: number,
  itemsToDelete: string[] = [],
) {
  try {
    const order = await prisma.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        totalAmount: totalAmount,
        items: {
          deleteMany: { id: { in: itemsToDelete } },
        },
      },
      include: {
        items: true,
      },
    });

    return order;
  } catch (error) {
    throw error;
  }
}

export async function deleteOrder(orderId: string) {
  try {
    const deletedOrder = await prisma.order.delete({
      where: {
        orderId: orderId,
      },
    });

    return deletedOrder;
  } catch (error) {
    throw error;
  }
}
