import React from 'react'
import { Button } from '../components/ui/button'
import { ArrowRight, Lock, Smartphone, Zap,CreditCard } from 'lucide-react'
import {useNavigate} from "react-router-dom"
import HyperText from "../components/ui/hyper-text"
import BlurIn from "../components/ui/blur-in";

const HeroSection = () => {
    const navigate =useNavigate();
  return (
    <div className="bg-white  ">
    <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="flex justify-center items-center lg:gap-8">
        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Fast, Secure, and</span>
            <span className="block text-indigo-600"><BlurIn className="inline-block" word="Effortless"/>  Payments</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Experience the future of online transactions with QuickFunds. Send money, pay bills, and manage your finances with just a few taps.
          </p>
          <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
            <Button onClick={() => navigate("/signup")} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Get Started <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Button>
          </div>
       </div>
      </div>
    </div>
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">Take control of your money.</span>
          <span className="block text-3xl text-indigo-600">Transfer funds instantly.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Get started
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button variant="outline" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HeroSection
