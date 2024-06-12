import Order from '../models/order.model';
import { OrderModel } from '../utils/interface';

export const getAllOrderService=async():Promise<object | string>=>{
  try{
    const order=await Order.find();
    return order;
  }catch(error){
    return ('error :'+error);
  }
};

export const saveOrderService=async(data:OrderModel):Promise<object | string>=>{
  try{

    //auto increment oid
    const highestOid= await Order.findOne().sort('-oid').select('oid').lean();
    const newOid = highestOid ? highestOid.oid + 1 : 1;

    const temp=data.itemList.map((item) => ({
      book_name: item.book_name,
      quantity: item.quantity,
      price: item.price,
    }));
    
    const dataObj = new Order({
      oid: newOid,
      customer_name: data.customer_name,
      itemList: temp,
      totalAmount: data.totalAmount,
      shippingAddress: data.shippingAddress,
      orderDate: data.orderDate,
    });

    const saveResponse=await dataObj.save();
    return {message:'Order added successfully !',saveResponse};
  }catch(error){
    return ('error :'+error);
  }
};

export const searchOrderService=async(data:string):Promise<object | string>=>{
  try{
    const searchedOrder = await Order.find({customer_name:data});
    return searchedOrder;
  }catch(error) {
    return ('error :'+error);
  }
};