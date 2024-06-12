/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getAllOrderService, saveOrderService, searchOrderService } from '../services/orderService';

export const getAllOrder=async(req:Request,res:Response):Promise<any>=>{
  try{
    const order=await getAllOrderService();
    res.send(order);
  }catch(error){
    res.status(400);
  }
};
  
export const saveOrder=async(req:Request,res:Response):Promise<any>=>{
  try{
    const order=await saveOrderService(req.body);
    res.send(order);
  }catch(error){
    res.status(400);
  }
};
export const searchOrder=async(req:Request,res:Response):Promise<any>=>{
  try{
    const order=await searchOrderService(req.params.customer_name);
    res.send(order);
  }catch(error){
    res.status(400);
  }
};