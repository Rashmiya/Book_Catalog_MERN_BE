import mongoose from 'mongoose';
const bookSchema=new mongoose.Schema({
  bid:{
    type:Number,
    required:true
  },
  book_name:{
    type:String,
    required:true
  },
  book_author:{
    type:String,
    required:true
  },
  book_type:{
    type:String,
    required:true
  },
  book_qty:{
    type:Number,
    required:true
  },
  book_price:{
    type:Number,
    required:true
  },
  book_image:{
    type:String,
    required:true
  }
}
);
const Book=mongoose.model('Book',bookSchema);
export default Book;