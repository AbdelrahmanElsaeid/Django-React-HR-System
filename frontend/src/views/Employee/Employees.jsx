import React,{useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios'

function Employees() {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        
    
        apiInstance.get(`employee/`).then((res) => {
          console.log(res.data)
          
          setEmployees(res.data)
        })
      
      },[])

  return (
    <div className="container-fluid" id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main">
                    <div className="mb-3 mt-3" style={{ marginBottom: 300 }}>
                        <div>
                            <h4 style={{marginLeft:'500px', paddingTop:'20px'}}><i className="bi bi-cart-check-fill"></i> All Employees Table  </h4>

                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">FullName</th>
                                        <th scope="col">position</th>
                                        <th scope="col">phone</th>
                                        <th scope="col">Employee Type</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees?.map((e, index) => (
                                        <tr key={index}>
                                            <th scope="row">#{e.id}</th>
                                            <td>{e.full_name}</td>
                                            <td>{e.position}</td>
                                            <td>{e.phone}</td>
                                            <td>{e.employee_type}</td>
                                            <td>{e.status}</td>
                                            <td>
                                            <Link  to={`/employee/${e.id}`} className="btn btn-success mb-1 me-2">
                                                <i className="fas fa-edit" />
                                            </Link>
                                                
                                            </td>
                                        </tr>
                                    ))}

                                    {employees < 1 &&
                                        <h5 className='mt-4 p-3'>There are no employees</h5>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Employees