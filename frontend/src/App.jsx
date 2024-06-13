import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './views/auth/Login'
import Home from './views/auth/Home'
import Logout from './views/auth/Logout'
import StoreFooter from './views/base/StoreFooter'
import StoredHeader from './views/base/StoredHeader'
import Employees from './views/Employee/Employees'
import EmployeeDetail from './views/Employee/EmployeeDetail'
import Attendance from './views/Employee/Attendance'
import AddEmployee from './views/Employee/AddEmployee'
import DashboardEmp from './views/Employee/DashboardEmp'
import PrivateRoute from './layout/PrivateRoute'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <StoredHeader />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/employees' element={<PrivateRoute><Employees /></PrivateRoute>} />
          <Route path='/employee/:employee_id/' element={<PrivateRoute><EmployeeDetail /></PrivateRoute>} />
          <Route path='/employee/add' element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
          <Route path='/attendance' element={<PrivateRoute><Attendance /></PrivateRoute>} />
          <Route path='/dashboard' element={<PrivateRoute><DashboardEmp/></PrivateRoute>} />
          
        </Routes>
      <StoreFooter />  
    </BrowserRouter>
    
    
      
    
  )
}

export default App
