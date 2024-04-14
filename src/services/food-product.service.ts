import { PrismaClient } from '@prisma/client';

import { FoodProduct } from '../models/food-product.model';

const prisma = new PrismaClient();

export async function getFoodProducts(
  userId: string,
  page: number,
  pageSize: number,
  order: string = 'asc',
  orderBy: string = 'name',
) {
  try {
    const skip = (page - 1) * pageSize;
    const existingProducts = await prisma.foodProduct.findMany({
      where: {
        userId: userId,
      },
      skip: skip,
      take: pageSize,
      orderBy: {
        [orderBy]: order,
      },
    });

    return existingProducts;
  } catch (error) {
    throw error;
  }
}

export async function getFoodProductByName(productName: string) {
  try {
    const existingProduct = await prisma.foodProduct.findFirst({
      where: {
        name: productName,
      },
    });

    return existingProduct;
  } catch (error) {
    throw error;
  }
}

export async function createFoodProduct(productData: FoodProduct) {
  try {
    const createdProduct = await prisma.foodProduct.create({
      data: {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return createdProduct;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getFoodProductById(productId: string) {
  try {
    const existingProduct = await prisma.foodProduct.findUnique({
      where: {
        id: productId,
      },
    });

    return existingProduct;
  } catch (error) {
    throw error;
  }
}

export async function updateFoodProduct(
  productId: string,
  updatedProductData: FoodProduct,
) {
  try {
    const updatedProduct = await prisma.foodProduct.update({
      where: {
        id: productId,
      },
      data: {
        ...updatedProductData,
        updatedAt: new Date(),
      },
    });

    return updatedProduct;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteFoodProduct(productId: string) {
  try {
    await prisma.foodProduct.delete({
      where: {
        id: productId,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
