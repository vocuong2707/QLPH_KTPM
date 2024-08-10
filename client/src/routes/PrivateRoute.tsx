import React from 'react';
import { Navigate } from 'react-router-dom';
interface PrivateRouteProps {
    component: React.FC<any>;
}
/**
 * Private router
 * @param {object} props
 * @return {jsx}
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const isAuthenticate = true;
    if (!isAuthenticate) return <Navigate to={'/'} />;
    return <Component />;
};

export default PrivateRoute;
