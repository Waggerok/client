//React Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/UI/Alert/Alert';

// Icons
import { LuLoader } from 'react-icons/lu';
import { currentTelegramUser } from '../variables';


const Checkout = () => {

    const navigate = useNavigate();

    const [basket, setBasket] = useState([]);
    const [address, setAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/basket/${currentTelegramUser}`);

                const data = response.data;

                if (data && Array.isArray(data.basket_devices)) {
                    const devicesWithDetails = await Promise.all(
                        data.basket_devices.map(async (device) => {
                            const deviceDetails = await axios.get(
                                `${process.env.REACT_APP_API_LINK}/api/devices/${device.deviceId}`
                            );
                            return { ...device, details: deviceDetails.data }
                        })
                    )
                    setBasket(devicesWithDetails);

                    const total = devicesWithDetails.reduce(
                        (sum,item) => sum + item.details.price * quantity,
                        0
                    );
                    setTotalPrice(total)
                } else {
                    setBasket([]);
                }
            } catch(error) {
                console.error('Error during getting Basket', error);
            }
        }

        fetchBasket();
    },[])

    const submitOrder = async (e) => {
        e.PreventDefault();

        if(!address) {
            alert('Пожалуйста введите адрес доставки');
            return;
        }

        setIsLoading(false);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_LINK}/api/orders`, {
                    telegram_id : currentTelegramUser,
                    address,
                    total_price : totalPrice
                }
            )

            console.log('Order created', response.data);

            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false);
                navigate('/orders');
            },2000);
        } catch(error) {
            console.error('Error during created order', error);
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false)
            },2000)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="App">
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Оформление заказа</h2>
            <div className="checkout">
                <form onSubmit={submitOrder}>
                    <div className="checkout__field">
                        <label htmlFor="address">Адрес доставки:</label>
                        <input 
                            type="text" 
                            id="address"
                            placeholder="Введите адрес доставки"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="checkout__summary">
                        <h3>Сумма заказа {totalPrice} руб.</h3>
                    </div>
                    <button type='submit' className='checkout__submit' disabled={isLoading}>
                        {isLoading ? <LuLoader size={50}/> : 'Оформить заказ'}
                    </button>
                </form>
            </div>
            {successAlert && <Alert text="Заказ успешно оформлен" />}
            {errorAlert && <Alert text="Ошибка при оформлении заказа" />}
        </div>
    )
}

export default Checkout;