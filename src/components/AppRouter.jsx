//React Imports
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

//Pages
import MainPage from '../pages/MainPage';
import CartPage from '../pages/CartPage';
import OrdersPage from '../pages/OrdersPage';
import DevicePage from '../pages/DevicePage';
import AdminPage from '../pages/AdminPage';
import Checkout from '../pages/Checkout';
import AddDevicePage from '../pages/AddDevicePage';
import EditDevicePage from '../pages/EditDevicePage';
import DeleteDevicePage from '../pages/DeleteDevicePage';
import AddAdminPage from '../pages/AddAdminPage';
import DeleteAdminPage from '../pages/DeleteAdminPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='cart' element={<CartPage/>}></Route>
            <Route path='orders' element={<OrdersPage/>}></Route>
            <Route path='device/:id' element={<DevicePage/>}></Route>
            <Route path='checkout' element={<Checkout/>}></Route>
            <Route path='admin' element={<AdminPage/>}></Route>
            <Route path='admin/add-device' element={<AddDevicePage/>}></Route>
            <Route path='admin/edit-device' element={<EditDevicePage/>}></Route>
            <Route path='admin/delete-device' element={<DeleteDevicePage/>}></Route>
            <Route path='admin/add-admin' element={<AddAdminPage/>}></Route>
            <Route path='admin/delete-admin' element={<DeleteAdminPage/>}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
    );
};

export default AppRouter;