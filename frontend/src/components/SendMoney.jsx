import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CloudDownload, User2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

import axios from "axios";
import { toast } from "react-toastify";

const SendMoney = () => {

  const { id, name } = useParams();
  const [amount,setAmount] =useState();
  const [password,setPassword] =useState('');
  const navigate =useNavigate();
  
  const submitHandler = async()=>{
     try {
         const check = await axios.post("http://localhost:3000/api/v1/user/checkpassword",{
          password:password
         },{
          withCredentials:true
         })
            
         if(check.data.success == false){
           toast.error(check.data.message)
           return;
         }
        const tranferdetails = {
          amount,
          id
        }

        const res = await axios.post("http://localhost:3000/api/v1/tarnsaction/transfer",tranferdetails,{
          withCredentials:true
        })
        console.log(res.data);
        if(res.data){
          navigate("/succes/transfer")
        }
     } catch (error) {
       console.log(error.message);
       toast.error(error.message);
     }
  }

 
  return (
    <div className="flex items-center justify-center my-5">
      <Card className="w-[500px] ">
        <CardHeader className="flex items-center">
          <CardTitle className="text-3xl">Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full gap-4">
                <div className="flex  gap-2">
                   <User2/> <h1 className="text-2xl">{name}</h1>
                </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="name" className="w-[150px]">
                  Amount (in Rs)
                </Label>
                <Input id="name" type="number" required onChange ={(e) => setAmount(e.target.value)} className="flex-1" placeholder="Enter the amount" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 w-full hover:bg-green-800">Pay</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Password</DialogTitle>
          <DialogDescription>
            enter the password
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitHandler} >Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </CardFooter>
      </Card>

   
    </div>
  );
};

export default SendMoney;
