// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuthStore } from '../../store/auth';

// function Dashboard() {
//     const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
//     const user = useAuthStore((state) => state.user());

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-lg-12">
//                     <h1 className="mt-4">Home Page</h1>
//                     {isLoggedIn() ? (
//                         user.is_hr ? (
//                             <div className="container">
//                                 <div className="row">
//                                     <div className="col-lg-12">
//                                         <h6>Welcome HR, manage your system:</h6>
//                                         <Link className="btn btn-primary" to="/employees">Manage Employees</Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="container">
//                                 <div className="row">
//                                     <div className="col-lg-12">
//                                         <h6>If you want to manage employees, please log in with an HR account.</h6>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     ) : (
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col-lg-12">
//                                     <h6>Please log in to manage the system.</h6>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;




import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

function Home() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user());

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">Welcome</h1>
                            {isLoggedIn() ? (
                                <div>
                                    {user.is_hr ? (
                                        <div>
                                            <p className="lead text-center">Welcome HR {user.username}, manage your system:</p>
                                            <div className="text-center">
                                                <Link className="btn btn-primary mr-2" to="/dashboard">Manage Employees</Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="lead text-center">You Are Not Authorized to manage employees  </p>
                                            <p className="lead text-center">If you want to manage employees, please log in with an HR account.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <p className="lead text-center">Please log in to manage the system.</p>
                                    <div className="text-center">
                                        <Link className="btn btn-primary" to="/login">Log In</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;













