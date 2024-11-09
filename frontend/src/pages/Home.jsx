import React ,{useEffect} from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import { authState } from '../recoil/atom'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const Home = () => {
  const auth =useRecoilValue(authState);
  const navigate =useNavigate();
  
  useEffect(() =>{
    if(auth){
      navigate("/dashboard");
    }      

  },[auth])
  
  return (
    <div>
      <HeroSection />
    </div>
  )
}

export default Home
