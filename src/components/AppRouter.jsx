import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import CartPage from '../pages/CartPage';
import OrdersPage from '../pages/OrdersPage';
import DevicePage from '../pages/DevicePage';
import AdminPage from '../pages/AdminPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='cart' element={<CartPage/>}></Route>
            <Route path='orders' element={<OrdersPage/>}></Route>
            <Route path='device/:id' element={<DevicePage/>}></Route>
            <Route path='admin' element={<AdminPage/>}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
    );
};

export default AppRouter;