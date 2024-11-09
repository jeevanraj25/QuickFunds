import axios from "axios";
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { authState, userAtom } from "../recoil/atom";

const SignIn = () => { 
 
   const setAuth =useSetRecoilState(authState);
   const setUser =useSetRecoilState(userAtom);
  const navigate =useNavigate();
 
   const [data,setData] =useState({
      email:"",
      password:""
   })

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // console.log(data);
        try {
          const res =await axios.post("http://localhost:3000/api/v1/user/signin",data,{
            withCredentials:true
          });

          if(res.data){
             toast.success(res.data.message);
             setUser(true);
             setAuth(res.data.token);
             navigate("/dashboard");
          }
        } catch (error) {
           console.log(error)
           toast.error(error.message);
        }
    }

  return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            
          </div>
    
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email 
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={data.email}
                      onChange={(e) => setData({...data,email:e.target.value})}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>
    
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                     
                      required
                      value={data.password}
                      onChange={(e) => setData({...data,password:e.target.value})}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>
    
    
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                   Sign in
                  </button>
                </div>
                <p className="text-gray-600">Don't have account?<Link to={"/signup"}><span className="text-red-500">create one</span></Link></p>
              </form>
            </div>
          </div>
        </div>
  )
}

export default SignIn
