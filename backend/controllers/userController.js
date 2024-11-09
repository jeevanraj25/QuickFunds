import Account from "../model/AccountModel.js";
import Transaction from "../model/TranscationsModel.js";
import User from "../model/UserModel.js";
import { JWT_SECRET } from "../utils/config.js";
import { signinCheck, signupcheck } from "../utils/TypeCheck.js"
import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"

export const Signup = async (req,res) =>{
       
     try {
        const {success} = signupcheck.safeParse(req.body);
         
        // console.log(req.body);
        if(!success){
            return res.status(400).json({
                message:"Email already taken / Incorrect inputs"
            })
        }
       
        const existingUser = await User.findOne({
            email :req.body.email
        })
           
      
        
        if(existingUser){
            return res.status(400).json({
                message:"username already exists"
            })
        }
      
        const hashPassword = await bcrypt.hash(req.body.password,10);
         
        
        const user =await User.create({
            username: req.body.username,
            password:hashPassword ,
            email:req.body.email
        })
              
          user.save();
          
          const userId= user._id; 
          console.log("hello");
          await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
    
       
        const token =jwt.sign({user_id: user._id } ,JWT_SECRET);
        
        return res.cookie("token", token, {
            httpOnly: true,       
            secure: true,         
            sameSite: "none",    
        }).json({
            message: "Login successful",
            token,
        });
     } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:error.message
        })
     }
}


export const signin = async (req,res) =>{
    
    try {

         const {email,password} =req.body;

        const {success,error} =signinCheck.safeParse({email,password});
        
        if(error){
            return res.status(400).json({
                message:error
            })
        }
        
         const userexist =await User.findOne({email});

         if(!userexist){
             return res.status(400).json({
                message:"user not exist! please signup"
             })
         }
        
          const checkPassword =await bcrypt.compare(userexist.password,password);

          if(checkPassword){
            return res.status(402).json({
                message:"Wrong password please try again"
            })
          }


        const token =jwt.sign({
            userid:userexist._id
        } ,JWT_SECRET);
        
        return res.cookie("token", token, {
            httpOnly: true,       
            secure: true,         
            sameSite: "none",    
        }).json({
            message: "Login successful",
            token,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:error.message
        })
    }
}


export const logout =async (req,res) =>{
     try {
        
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
        });

        return res.status(200).json({
            message:"logout successful"
        })

     } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:error.message
        })
     }
}

export const getUsers = async (req,res) =>{
       
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
           username:{
             "$regex":filter
           }
        })
    
        res.status(200).json({
            user: users.map(user => ({
                username: user.username,
                _id: user._id
            }))
        })
    
    } catch (error) {
        
        return res.status(400).json({
            message:error.message
        })
    }
}

export  const getdata = async(req,res) =>{
       
    try {
        const users = await User.countDocuments();
        const transactions =await Transaction.countDocuments();
        
        return res.status(200).json({
            message:"users and transactions",
            users,
            transactions
        })
    } catch (error) {
        return res.status(error.message);
    }
}

export const checkPassword = async (req, res) => {
    const { password } = req.body;

    try {
      
        console.log(req.id);
      const user = await User.findById(req.id);
    
     
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
    
     
      if (typeof password !== 'string' || typeof user.password !== 'string') {
        return res.status(400).json({
          message: "Invalid data types for password or hash",
          success: false,
        });
      }
    
     
      const check = await bcrypt.compare(password, user.password);
    
      if (!check) {
        return res.status(200).json({
          message: "Wrong password",
          success: false,
        });
      }
    
      return res.status(200).json({
        message: "Correct password",
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  