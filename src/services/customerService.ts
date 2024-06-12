import Customer from '../models/customer.model';
import { CustomerModel } from '../utils/interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../utils/config';

//get customer
export const getAllCustomerService=async():Promise<object | string>=>{
  try{
    const customer=await Customer.find();
    return customer;
  }catch(error){
    return ('error :'+error);
  }
};

//save customer
export const saveCustomerService=async(data:CustomerModel):Promise<CustomerModel>=>{
  try{
    const findCustomer:boolean = await Customer.findOne({ email: data.email }).lean();
    if(findCustomer){
      return null;
    }

    const dataObj=new Customer();
    
    //auto increment cid
    const highestCid = await Customer.findOne().sort('-cid').select('cid').lean();
    const newCid = highestCid ? highestCid.cid + 1 : 1;

    //bcrypt password
    const tempPassword = data.password;
    const hash = await bcrypt.hash(tempPassword, 10);
    //set Data
    dataObj._id=data._id;
    dataObj.cid=newCid;
    dataObj.email=data.email;
    dataObj.name=data.name;
    dataObj.userRoll=data.userRoll;
    dataObj.password=hash;

    const saveResponse=await dataObj.save();
    return saveResponse;
    
  }catch(error){
    return error;
  }
};

//login customer
export const getCustomer = async (data: CustomerModel):Promise<CustomerModel> => {
  try {
    const findCustomer = await Customer.findOne({ email: data.email });
    if (findCustomer) {
      const isValid = await bcrypt.compare(data.password, findCustomer.password);
      if (isValid) {
        return findCustomer;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}; 

//get new access token
export const refreshService = async (refreshToken: string) => {
  try {
    const verifyRefToken = jwt.verify(refreshToken, config.jwt_secretRe_key);
    if (!verifyRefToken) {
      console.log('Unauthorized');
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const tempEmail = verifyRefToken.email;
      const findCustomer = await Customer.findOne({ email: tempEmail });
      if (findCustomer) {
        return findCustomer;
      }
    }
  } catch (err) {
    console.log('Get New Access Token Eroor ', err);
    return { err: 'Cannot Get New Access Token' };
  }
};

//get userDetails
export const getUserDetails = async (userAccToken: string) => {
  try {
    const verifyAccToken = jwt.verify(userAccToken, config.jwt_secret_key);
    if (!verifyAccToken) {
      console.log('Unauthorized');
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const userEmail = verifyAccToken.email;
      console.log(userEmail);
      const findCustomer = await Customer.findOne({ email: userEmail });
      // const secret = config.jwt_secret_key;
      if (findCustomer !== null) {
        const userData = {
          email: findCustomer.email,
          name: findCustomer.name,
          userRoll: findCustomer.userRoll,
        };
        return {
          userData,
        };
      }else{
        throw new Error('Customer not found');
      }
    }
  } catch (err) {
    console.log('Get New Access Token Eroor ', err);
    throw new Error('Cannot Get New Access Token');
  }
};

//delete customer
export const deleteCustomerService=async(data:string):Promise<object | string>=>{
  try{
    const deleteResponse=await Customer.findByIdAndDelete(data);
    return {message:'Customer Deleted successfuly !',deleteResponse};
  }catch(error) {
    return ('error :'+error);
  }
};