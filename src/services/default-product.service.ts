import { PrismaClient } from '@prisma/client';
import { Category, DefaultProduct } from '../models/default-product.model';

const prisma = new PrismaClient();

export async function getDefaultProducts(
  userId: string,
  page: number,
  pageSize: number,
  order: string = 'asc',
  orderBy: string = 'productName',
) {
  try {
    const skip = (page - 1) * pageSize;
    const existingProducts = await prisma.defaultProduct.findMany({
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

export async function getDefaultProductByName(productName: string) {
  try {
    const existingProduct = await prisma.defaultProduct.findFirst({
      where: {
        productName: productName,
      },
    });

    return existingProduct;
  } catch (error) {
    throw error;
  }
}

export async function createDefaultProduct(productData: DefaultProduct) {
  try {
    const createdProduct = await prisma.defaultProduct.create({
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

export async function getDefaultProductById(productId: string) {
  try {
    const existingProduct = await prisma.defaultProduct.findUnique({
      where: {
        id: productId,
      },
    });

    return existingProduct;
  } catch (error) {
    throw error;
  }
}

export async function updateDefaultProduct(
  productId: string,
  updatedProductData: DefaultProduct,
) {
  try {
    const updatedProduct = await prisma.defaultProduct.update({
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

export async function deleteDefaultProduct(productId: string) {
  try {
    await prisma.defaultProduct.delete({
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

export async function createCategory(categoryData: Category) {
  try {
    const newCategory = await prisma.category.create({
      data: categoryData,
    });

    return newCategory;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
