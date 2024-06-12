import express from 'express';
import { getAllOrder, saveOrder, searchOrder } from '../controllers/orderController';
import { permissions } from '../middleware/checkAuth';
const route=express.Router();
route.get('/',getAllOrder);
route.get('/:customer_name',searchOrder);
route.post('/',permissions,saveOrder);

export default route;