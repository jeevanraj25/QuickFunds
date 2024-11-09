import { Zap } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { authState, userAtom } from '../recoil/atom'
import axios from 'axios'
import { toast } from 'react-toastify'


const NavBar = () => {
    
  const [user, setUser] = useRecoilState(userAtom);
  const setUserAtom = useSetRecoilState(userAtom);
  const setAuthstate =useSetRecoilState(authState);

  const navigate =useNavigate();

  const submitHandler = async() =>{
     try {
        const res= await axios.get("http://localhost:3000/api/v1/user/logout",{
          withCredentials:true
        })

        if(res.data){
          setUserAtom(false);
          setAuthstate(null)
          toast(res.data.message);
          navigate("/")
        }
     } catch (error) {
      
     }
  }
    
  return (
    <div>
      <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">QuickFunds</span>
          </Link>
          {user ? <div className="flex items-center space-x-4">
                    <Button onClick={submitHandler}>Login out</Button>
          </div>:<div className="flex items-center space-x-4">
            <Link to="/signin" ><Button className="bg-blue-500 hover:bg-blue-500">Sign in</Button></Link>
            <Link to="/signup" ><Button>Sign up</Button></Link>
          </div>}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default NavBar
