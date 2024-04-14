import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  createFoodProduct,
  deleteFoodProduct,
  getFoodProductById,
  getFoodProductByName,
  getFoodProducts,
  updateFoodProduct,
} from '../services/food-product.service';
import {
  createCategory,
  createDefaultProduct,
  deleteDefaultProduct,
  getDefaultProductById,
  getDefaultProductByName,
  getDefaultProducts,
  updateDefaultProduct,
} from '../services/default-product.service';

const router = Router();

router.get(
  '/products',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posType = req.query?.posType;
      const userId = req.body?.userId;
      const page = parseInt(req.query?.page as string) || 1; // Default to page 1
      const pageSize = parseInt(req.query?.pageSize as string) || 10; // Default to 10 items per page
      const order = req.query?.order as string; // 'asc' or 'desc', default to 'asc'
      const orderBy = req.query?.orderBy as string; // 'productName' or 'createdAt', default to 'productName'

      if (!userId || !posType) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      let products;

      switch (posType) {
        case 'foodPos':
          products = await getFoodProducts(
            userId,
            page,
            pageSize,
            order,
            orderBy,
          );
          break;
          break;
        case 'defaultPos':
          products = await getDefaultProducts(
            userId,
            page,
            pageSize,
            // order,
            // orderBy,
          );
          break;
        default:
          return res.status(404).json({ errors: 'Invalid POS Type' });
      }

      if (!products) {
        return res
          .status(404)
          .json({ errors: 'No data found for the provided userId.' });
      }

      res.json({
        products,
        success: true,
        message: 'Products fetch successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/product',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posType = req.query?.posType;
      const { body } = req;

      let validationFields;
      let getProductByName;
      let createProduct;

      switch (posType) {
        case 'foodPos':
          validationFields = ['name', 'price', 'stock', 'userId'];
          getProductByName = getFoodProductByName;
          createProduct = createFoodProduct;
          break;
        case 'defaultPos':
          validationFields = [
            'productName',
            'retailPrice',
            'stock',
            'unit',
            'userId',
          ];
          getProductByName = getDefaultProductByName;
          createProduct = createDefaultProduct;
          break;
        default:
          return res.status(404).json({ errors: 'Invalid POS Type' });
      }

      const missingFields = validationFields.filter((field) => !body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Incomplete input fields',
          missingFields,
        });
      }

      const existing = await getProductByName(body[validationFields[0]]);

      if (existing) {
        return res.status(409).json({
          error: 'Product with the same name already exists.',
        });
      }

      const result = await createProduct(body);

      res.json({
        posType: posType,
        result,
        success: true,
        message: 'Product Successfully Created',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/product/:productId',
  auth.optional, // Add authentication middleware if required
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posType = req.query?.posType;
      const productId = req.params.productId;
      const { body } = req;

      let validationFields;
      let getProductById;
      let updateProduct;

      switch (posType) {
        case 'foodPos':
          validationFields = ['name', 'price', 'stock', 'userId'];
          getProductById = getFoodProductById;
          updateProduct = updateFoodProduct;
          break;
        case 'defaultPos':
          validationFields = [
            'productName',
            'retailPrice',
            'stock',
            'unit',
            'userId',
          ];
          getProductById = getDefaultProductById;
          updateProduct = updateDefaultProduct;
          break;
        default:
          return res.status(404).json({ errors: 'Invalid POS Type' });
      }

      const missingFields = validationFields.filter((field) => !body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Incomplete input fields',
          missingFields,
        });
      }

      const existing = await getProductById(productId);

      if (!existing) {
        return res.status(404).json({
          error: 'Product not found.',
        });
      }

      const result = await updateProduct(productId, body);

      res.json({
        posType: posType,
        result,
        success: true,
        message: 'Product Successfully Updated',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/product/:productId',
  auth.optional, // Add authentication middleware if required
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const posType = req.query?.posType;

      let deleteProduct;
      let getProductById;

      switch (posType) {
        case 'foodPos':
          deleteProduct = deleteFoodProduct;
          getProductById = getFoodProductById;
          break;
        case 'defaultPos':
          deleteProduct = deleteDefaultProduct;
          getProductById = getDefaultProductById;
          break;
        default:
          return res.status(404).json({ errors: 'Invalid POS Type' });
      }

      const existingProduct = await getProductById(productId);

      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await deleteProduct(productId);

      res.json({
        posType: posType,
        success: true,
        message: 'Product Successfully Deleted',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/category',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const { posType, categoryName } = req.query;

      if (!userId || !posType || !categoryName) {
        return res.status(400).json({ error: 'Missing Parameters' });
      }

      const newCategory = await createCategory({
        posType: posType.toString(),
        categoryName: categoryName.toString(),
        userId,
      });

      res.json({
        category: newCategory,
        success: true,
        message: 'Category created successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);
export default router;
