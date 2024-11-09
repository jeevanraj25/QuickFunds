import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useSetRecoilState } from 'recoil';
import { authState, userAtom } from '../recoil/atom';
import { toast } from 'react-toastify';

const SignUp = () => {
    
     const setAuth = useSetRecoilState(authState);
     const setUser =useSetRecoilState(userAtom);
     const navigate =useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email:"",
	    password: ""
      });

      const handleChange = (e) =>{
         setFormData({...formData,[e.target.name]:e.target.value})
      }

      const handleSubmit = async (e) =>{
        e.preventDefault();
           try {
             const res = await axios.post("http://localhost:3000/api/v1/user/signup",formData,{
              withCredentials:true
             })
             
             
          if(res.data){
            toast.success(res.data.message);
            setUser(true);
            setAuth(res.data.token);
            navigate("/signin");
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  required
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
