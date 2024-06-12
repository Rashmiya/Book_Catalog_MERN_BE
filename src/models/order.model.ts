import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const orderSchema=new mongoose.Schema({
  oid:{
    type:Number,
    required:true
  },
  customer_name:{
    type:String,
    required:true
  },
  itemList: [itemSchema],
  totalAmount:{
    type:Number,
    required:true
  },
  shippingAddress:{
    type:String,
    required:true
  },
  orderDate: {
    type: Date,
    required:true,
    default: Date.now,
  },
}
);
const Order=mongoose.model('Order',orderSchema);
export default Order;