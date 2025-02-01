import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {currentTelegramUser} from '../variables'
import { LuLoader } from 'react-icons/lu';


const OrdersPage = () => {

    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/orders/${currentTelegramUser}`);

                setOrders(response.data);
            } catch(error) {
                console.error('Ошибка при загрузке товаров', error);
            } finally {
                setLoader(false);
            }
        };

        fetchOrders();
    },[])

    if (loader) {
        return (
            <div className="loader">
                <LuLoader size={50}/>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '45%' }}>
                У вас пока нет заказов
            </div>
        )
    }


    return (
        <div className='App'>
            <div className="orders">
                <div className="orders__title">
                    <h2>Мои заказы</h2>
                </div>
                <div className="orders__list">
                    {orders.map((order) => (
                        <div className="orders__item" key={order.id}>
                            <div className="orders__item-details">
                                <div>
                                    <strong>Номер заказа: </strong>{order.id}
                                </div>
                                <div>
                                    <strong>Дата:</strong> {new Date(order.createdAt).toLocaleString()}
                                </div>
                                <div>
                                    <strong>Адрес:</strong> {order.address}
                                </div>
                                <div>
                                    <strong>Полная стоимость заказа:</strong> {order.total_price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;