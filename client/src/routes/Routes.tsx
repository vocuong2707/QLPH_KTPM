import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import PrivateRouter from './PrivateRoute';
import { Login } from '../page/Login/Login';
interface RoutesProps {}
/**
 * Routes component
 * @return {jsx}
 */
const Routes: React.FC<RoutesProps> = () => {
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route path="/" element={<PrivateRouter component={Login} />} />
            </ReactRoutes>
        </BrowserRouter>
    );
};
export default Routes;
