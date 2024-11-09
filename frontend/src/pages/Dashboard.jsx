import React, { useEffect } from "react"
import { useState } from 'react'
import { Search, Send, CreditCard, DollarSign, Users, Bell, ChevronDown } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import axios from "axios"
import { toast } from "react-toastify"
import { userDataSelector } from "../recoil/atom"
import { useRecoilValue } from "recoil"


const initialUsers = [
  { id: 1, username: 'alice_smith', fullName: 'Alice Smith', lastTransaction: '2023-06-15' },
  { id: 2, username: 'bob_johnson', fullName: 'Bob Johnson', lastTransaction: '2023-06-14'},
  { id: 3, username: 'carol_williams', fullName: 'Carol Williams', lastTransaction: '2023-06-13'},
  { id: 4, username: 'david_brown', fullName: 'David Brown', lastTransaction: '2023-06-12' },
  { id: 5, username: 'eva_davis', fullName: 'Eva Davis', lastTransaction: '2023-06-11' },
]
const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); 
  const navigate = useNavigate();
 
 
  const userData =useRecoilValue(userDataSelector);

   
  useEffect(() =>{
      
    const users = async () =>{
      try {
        const res = await axios.get("http://localhost:3000/api/v1/tarnsaction/transactions",{
          withCredentials:true
        })
        // console.log(res.data.formattedData);
        setUsers(res.data.formattedData)
        setAllUsers(res.data.formattedData); 
     } catch (error) {
        console.log(error)
     }
    }
     
    users();
    
  },[])

 

  const handleSearch = (e) => {
    const searchQuery = e.target.value; 

    
  
     if(searchQuery === ''){
       setUsers(allUsers);
     }else{
      const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
       )
        
       setUsers(filteredUsers);
     }

  }

  const handleSendMoney = (id,username) => {
    // console.log(id,username);
     navigate(`/sendmoney/${id}/${username}`)
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
      </div>
    </div>

    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Number(userData.balance).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.transactions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.users}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search users..."
               onChange={handleSearch}
              className="flex-grow"
            />
          </div>

          <div className="rounded-md border ">
            <Table>
              <TableHeader>
                <TableRow >
                  <TableHead className="flex items-center mx-10">User</TableHead>
                  <TableHead>Last Transaction</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="flex items-center justify-end mr-10">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {users.map((user) => (
  <TableRow className="" key={user._id}>
    <TableCell className="font-medium">
      <div className="flex mx-5 items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username || 'User'}`} alt={user.fullName || 'User'} />
          <AvatarFallback>{(user.fullName ? user.fullName.split(' ').map(n => n[0]).join('') : 'U')}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{user.username || 'Unknown User'}</div>
          <div className="text-sm text-gray-500">{user.email || 'Unknown'}</div>
        </div>
      </div>
    </TableCell>
    <TableCell>
      {user.transactions && user.transactions.length > 0 ? (
        <div>
          {user.transactions.map((transaction, index) => (
            <div key={index}>
              <span>{transaction.date.split('T')[0]}</span>
            </div>
          ))}
        </div>
      ) : (
        'No transactions'
      )}
    </TableCell>
    <TableCell>
      {user.transactions && user.transactions.length > 0 ? (
        <div>
          {user.transactions.map((transaction, index) => (
            <div key={index}>
              <span>{transaction.amount}</span>
            </div>
          ))}
        </div>
      ) : (
        'No transactions'
      )}
    </TableCell>
    <TableCell className="flex justify-end mr-5">
      <Button
        onClick={() => handleSendMoney(user._id,user.username)}
        size="sm"
        className="inline-flex items-center"
      >
        <Send className="h-4 w-4 mr-2" />
        Quick Transfer
      </Button>
    </TableCell>
  </TableRow>
))}


              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>
    </div>
  </div>
  )
}

export default Dashboard
