import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import Sidebar from './Sidebar';
import Toast from '../../utils/toast';


function EmployeeDetail() {
    const { employee_id } = useParams(); 
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        position: '',
        phone: '',
        education: '',
        status: '',
        employee_type: '',
        gender: '',
        image: null
    });

    const employeeTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'];
    const GenderTypes = ['Male', 'Female']
    const StatusTypes = ['Active', 'NotActive']

    useEffect(() => {
        apiInstance.get(`employee/${employee_id}/`).then((res) => {
            setEmployee(res.data);
            setFormData({
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                position: res.data.position,
                phone: res.data.phone,
                education: res.data.education,
                status: res.data.status,
                employee_type: res.data.employee_type,
                gender: res.data.gender,
                image: res.data.image 
            });
        });
    }, [employee_id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSave = async () => {
        const updatedData = new FormData();

        updatedData.append('first_name', formData.first_name);
        updatedData.append('last_name', formData.last_name);
        updatedData.append('position', formData.position);
        updatedData.append('phone', formData.phone);
        updatedData.append('education', formData.education);
        updatedData.append('status', formData.status);
        updatedData.append('employee_type', formData.employee_type);
        updatedData.append('gender', formData.gender);
        if (formData.image && formData.image !== employee.image) {
            updatedData.append('image', formData.image);
        }

        try {
            await apiInstance.patch(`employee/${employee_id}/`, updatedData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                
            });
            Toast.fire({
                icon: "success",
                title: "Employee Updated Successfully"
              })
            navigate('/employees'); 
        } catch (error) {
            console.error(error);
        }
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className="container-fluid" id="main">
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-lg-9 mt-1">
                    <section>
                        <main>
                            <div className="container px-4">
                                <section>
                                    <h3 className="mb-3">
                                        <i className="bi bi-person-badge-fill"></i> Employee Details
                                    </h3>
                                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                        <div className="row">
                                            <div className="col-lg-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                                                        <img
                                                            src={employee.image}
                                                            style={{ width: '100%', height: '250px',  borderRadius: '40%' }}

                                                            className="w-100"
                                                            alt="Employee"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 mb-3">
                                                <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <label htmlFor="image" className="form-label">Employee Image</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id="image"
                                                        name="image"
                                                        accept="image/jpeg, image/png, image/gif"
                                                        onChange={handleImageChange}
                                                    />
                                                    
                                                </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="first_name" className="form-label">First Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="first_name"
                                                            name="first_name"
                                                            value={formData.first_name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="last_name" className="form-label">Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="last_name"
                                                            name="last_name"
                                                            value={formData.last_name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="position" className="form-label">Position</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="position"
                                                            name="position"
                                                            value={formData.position}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="phone" className="form-label">Phone</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="phone"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="education" className="form-label">Education</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="education"
                                                            name="education"
                                                            value={formData.education}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    
                                                    <div className="col-lg-6 mb-3">
                                                    <label htmlFor="status" className="form-label">Status <span className="text-muted">(Dropdown)</span></label>
                                                        <select
                                                            className="form-control"
                                                            id="status"
                                                            name="status"
                                                            value={formData.status}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select Status Type</option>
                                                            {StatusTypes.map(type => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                    <label htmlFor="employee_type" className="form-label">Employee Type <span className="text-muted">(Dropdown)</span></label>
                                                        <select
                                                            className="form-control"
                                                            id="employee_type"
                                                            name="employee_type"
                                                            value={formData.employee_type}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select Employee Type</option>
                                                            {employeeTypes.map(type => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                    <label htmlFor="gender" className="form-label">Gender <span className="text-muted">(Dropdown)</span></label>
                                                        <select
                                                            className="form-control"
                                                            id="gender"
                                                            name="gender"
                                                            value={formData.gender}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select Gender Type</option>
                                                            {GenderTypes.map(type => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </main>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetail;
