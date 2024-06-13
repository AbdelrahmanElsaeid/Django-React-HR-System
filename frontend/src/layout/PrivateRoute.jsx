import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'




const PrivateRoute = ({ children }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user());

    // Check if user is logged in and if is_hr is true
    if (isLoggedIn() && user.is_hr) {
        return <>{children}</>;
    } else {
        return <Navigate to='/login' />;
    }
};

export default PrivateRoute;