import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import Sidebar from './Sidebar';
import Toast from '../../utils/toast';

function AddEmployee() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
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
    const GenderTypes = ['Male', 'Female'];
    const StatusTypes = ['Active', 'NotActive'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });


    };

    const validateForm = () => {
        if (!formData.email || !formData.username || !formData.password ||
            !formData.first_name || !formData.last_name || !formData.position ||
            !formData.phone || !formData.education || !formData.status ||
            !formData.employee_type || !formData.gender || !formData.image ) {
            Toast.fire({
                icon: 'error',
                title: 'Please fill in all required fields'
            });
            return false;
        }
        // Validate phone number (numeric only)
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(formData.phone)) {
            Toast.fire({
                icon: 'error',
                title: 'Phone number should contain only digits'
            });
            return false;
        }
        return true;
    };

    const handleSave = async (e) => {
        e.preventDefault();

         if (!validateForm()) {
            return;
        }

        const newEmployeeData = new FormData();
        newEmployeeData.append('user[email]', formData.email);
        newEmployeeData.append('user[username]', formData.username);
        newEmployeeData.append('user[password]', formData.password);

        newEmployeeData.append('employee[first_name]', formData.first_name);
        newEmployeeData.append('employee[last_name]', formData.last_name);
        newEmployeeData.append('employee[position]', formData.position);
        newEmployeeData.append('employee[phone]', formData.phone);
        newEmployeeData.append('employee[education]', formData.education);
        newEmployeeData.append('employee[status]', formData.status);
        newEmployeeData.append('employee[employee_type]', formData.employee_type);
        newEmployeeData.append('employee[gender]', formData.gender);

        if (formData.image) {
            newEmployeeData.append('employee[image]', formData.image);
        }

        try {
            const response = await apiInstance.post('create-user-employee/', newEmployeeData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            Toast.fire({
                icon: "success",
                title: "Employee Added Successfully"
              })
            navigate('/employees');
        } catch (error) {
            console.error('Error creating new employee:', error);
        }
    };

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
                                        <i className="bi bi-person-plus-fill"></i> Add New Employee
                                    </h3>
                                    <form onSubmit={handleSave}>
                                        <div className="row">
                                            <div className="col-lg-4 mb-3">
                                                <label htmlFor="image" className="form-label">Employee Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="image"
                                                    name="image"
                                                    accept="image/jpeg, image/png, image/gif"
                                                    onChange={handleImageChange}
                                                />
                                                {formData.image && (
                                                    <img
                                                        src={URL.createObjectURL(formData.image)}
                                                        alt="Preview"
                                                        style={{ width: '100%', height: '250px', marginTop: '10px' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="col-lg-8 mb-3">
                                                <div className="row">
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="email" className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="username" className="form-label">Username</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="username"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="password" className="form-label">Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleInputChange}
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
                                                            <option value="">Select Status</option>
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
                                                            <option value="">Select Gender</option>
                                                            {GenderTypes.map(type => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary mt-3">Save Employee</button>
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

export default AddEmployee;
