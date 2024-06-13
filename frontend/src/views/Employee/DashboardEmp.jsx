import React,{useState, useEffect} from 'react'
import apiInstance from '../../utils/axios'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
function DashboardEmp() {

  const [employees, setEmployees] = useState(0)
  const [attendance, setAttendance] = useState(0)

    useEffect(() => {
        
    
        apiInstance.get(`dashboard/`).then((res) => {
          
          setEmployees(res.data.employee_count)
          setAttendance(res.data.attendance_count)
        })

        
      },[])
  
  
  return (
      <div className="container-fluid" id="main">
          <div className="row row-offcanvas row-offcanvas-left h-100">
              <Sidebar />
              <div className="col-lg-9 mt-1">
                  <section>
                      <main>
                          <div className="container px-4">
                              <h1 className="my-4">Welcome to HR Management System</h1>
                              <div className="row">
                                  <div className="col-md-6 mb-4">
                                      <div className="card">
                                          <div className="card-body">
                                              <h5 className="card-title">Employees</h5>
                                              <p className="card-text">Total Employees: {employees}</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col-md-6 mb-4">
                                      <div className="card">
                                          <div className="card-body">
                                              <h5 className="card-title">Attendance</h5>
                                              <p className="card-text">Total Attendance Records:{attendance} </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </main>
                  </section>
              </div>
          </div>
      </div>
  );
}

export default DashboardEmp