/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { deleteBookService, fetchBookService, getAllBookService, saveBookService, searchBookService, updateBookService } from '../services/bookService';


export const getAllBook=async(req:Request,res:Response):Promise<any>=>{
  try{
    const book=await getAllBookService();
    res.send(book);
  }catch(error){
    res.status(400);
  }
};

export const saveBook=async(req:Request,res:Response):Promise<any>=>{
  try{

    const bookImage = req.file.originalname;
    const book=await saveBookService(req.body,bookImage);
    res.send(book);
  
  }catch(error){
    res.status(400);
  } 
};

export const updateBook=async(req:Request,res:Response):Promise<any>=>{
  try{
    console.log('contro -',req.body.book);
    const book=await updateBookService(req.body);
    res.send(book);
  }catch(error){
    res.status(400);
  }
};

export const searchBook=async(req:Request,res:Response):Promise<any>=>{
  try{
    const book=await searchBookService(req.params.book_name);
    res.send(book);
  }catch(error){
    res.status(400);
  }
};

export const fetchBook=async(req:Request,res:Response):Promise<any>=>{
  try{
    const book=await fetchBookService(req.params.bid);
    console.log(book);
    res.send(book);
  }catch(error){
    res.status(400);
  }
};

export const deleteBook=async(req:Request,res:Response):Promise<any>=>{
  try{
    const book=await deleteBookService(req.params.id);
    res.send(book);
  }catch(error){
    res.status(400);
  }
};
