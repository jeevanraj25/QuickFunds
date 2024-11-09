import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import NavBar from './components/NavBar.jsx'
import Wrapper from './Wrapper.jsx'
import SendMoney from './components/SendMoney.jsx'
import TransferCard from './components/TransferCard.jsx'

function App() {
  const approuter = createBrowserRouter([

     {
       path:"/",
       element:<Wrapper />,
       children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/dashboard",
          element:<Dashboard />
        },
        {
          path:"/sendmoney/:id/:name",
          element:<SendMoney />
        },
        {
          path:"/succes/transfer",
          element:<TransferCard />
        }
       ]
     },
     {
      path:"/signin",
      element:<SignIn />
   },
   {
     path:"/signup",
     element:<SignUp />
   }

    
  ])
  return (
    <>
      
     <RouterProvider router={approuter} />
    </>
  )
}

export default App
