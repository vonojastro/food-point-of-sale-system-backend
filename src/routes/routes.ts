import { Router } from 'express';

import productController from '../controllers/product.controller';
import employeeController from '../controllers/employee.controller';
import orderController from '../controllers/order.controller';
import attendanceController from '../controllers/attendace.controller';
import userController from '../controllers/';

const api = Router()
  .use(productController)
  .use(employeeController)
  .use(orderController)
  .use(attendanceController)
  .use(userController);

export default Router().use('/api', api);
