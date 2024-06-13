import React, { useState, useEffect } from 'react';
import apiInstance from '../../utils/axios';
import Sidebar from './Sidebar';
import Toast from '../../utils/toast';


function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState({
        employee: '',
        date: '',
        status: ''
    });
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    const attendanceStatusOptions = ['Present', 'Absent', 'Leave'];

    useEffect(() => {
        apiInstance.get('employee/')
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
            });

        apiInstance.get('attendance/')
            .then((res) => {
                setAttendanceRecords(res.data);
            })
            .catch((error) => {
                console.error('Error fetching attendance records:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAttendanceData({ ...attendanceData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log('Submitting attendance data:', attendanceData);
        try {
            const response = await apiInstance.post('attendance/', attendanceData);
            console.log('Response:', response.data);
            setAttendanceRecords([...attendanceRecords, response.data]);
            setAttendanceData({
                employee: '',
                date: '',
                status: ''
            });
            Toast.fire({
              icon: "success",
              title: "Attendance recorded successfully"
            })
        } catch (error) {
            console.error('Error recording attendance:', error);
            if (error.response && error.response.data) {
                console.error('Error details:', error.response.data);
            }
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
                                        <i className="bi bi-calendar-check-fill"></i> Record Attendance
                                    </h3>
                                    <form onSubmit={handleSave}>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <label htmlFor="employee" className="form-label">Employee</label>
                                                <select
                                                    className="form-control"
                                                    id="employee"
                                                    name="employee"
                                                    value={attendanceData.employee}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Select Employee</option>
                                                    {employees.map((employee) => (
                                                        <option key={employee.id} value={employee.id}>
                                                            {employee.first_name} {employee.last_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label htmlFor="date" className="form-label">Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="date"
                                                    name="date"
                                                    value={attendanceData.date}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label htmlFor="status" className="form-label">Status</label>
                                                <select
                                                    className="form-control"
                                                    id="status"
                                                    name="status"
                                                    value={attendanceData.status}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Select Status</option>
                                                    {attendanceStatusOptions.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-3">Record Attendance</button>
                                    </form>
                                </section>

                                <section className="mt-5">
                                    <h3 className="mb-3">
                                        <i className="bi bi-table"></i> Attendance Records
                                    </h3>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Employee</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendanceRecords.map((record) => {
                                                const employee = employees.find(emp => emp.id === record.employee);
                                                return (
                                                    <tr key={record.id}>
                                                        <td>{employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown'}</td>
                                                        <td>{record.date}</td>
                                                        <td>{record.status}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </main>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Attendance;

