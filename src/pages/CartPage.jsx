//React Imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currentTelegramUser } from '../variables';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/UI/Alert/Alert';

//Icons
import { LuLoader } from 'react-icons/lu';

const CartPage = () => {

    const navigate = useNavigate();

    const [basket, setBasket] = useState([]);
    const [loader, setLoader] = useState(true);
    const [deleteAlert,setDeleteAlert] = useState(false);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
    
                const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/basket/${currentTelegramUser}`);
                const data = response.data;
    
                if (data && Array.isArray(data.basket_devices)) {
                    // Загрузим детали для каждого устройства
                    const devicesWithDetails = await Promise.all(
                        data.basket_devices.map(async (device) => {
                            const deviceDetails = await axios.get(
                                `${process.env.REACT_APP_API_LINK}/api/devices/${device.deviceId}`
                            );
                            return { ...device, details: deviceDetails.data };
                        })
                    );
    
                    setBasket(devicesWithDetails);
                } else {
                    setBasket([]);
                }
            } catch (error) {
                console.error('Error during fetching basket for user', error);
            } finally {
                setTimeout(() => {
                    setLoader(false);
                },1000)
            }
        };
    
        fetchBasket();
    }, []);
    
    const deleteDeviceFromBasket = async (deviceId) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_API_LINK}/api/basket/${currentTelegramUser}/device/${deviceId}`
            )

            setBasket((prevBasket) => prevBasket.filter((item) => item.deviceId !== deviceId));

            setDeleteAlert(true);
            setTimeout(() => {
                setDeleteAlert(false)
            }, 2000)
        } catch(error) {
            console.error('Error during deleting device from basket');
            alert('Не удалось удалить товар из корзины');
        }
    }

    const clearBasket = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_API_LINK}/api/basket/${currentTelegramUser}/clear`
            );

            setBasket([]);

        } catch(error) {
            console.error('Error during clearing the basket', error);
            alert('Не удалось очистить корзину')
        }
    }

    const updateDeviceQuantity = async (deviceId, quantity) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_LINK}/api/basket/updateQuantity`, {
                telegram_id: currentTelegramUser,
                deviceId,
                quantity,
            });
    
            setBasket((prevBasket) =>
                prevBasket.map((device) =>
                    device.deviceId === deviceId ? { ...device, quantity } : device
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении количества устройства', error);
        }
    };

    if (!basket || basket.length === 0) {
        return (
            <div style={{textAlign: 'center', marginTop: '45%'}}>Ваша корзина пуста</div>
        )
    }

    if (loader) {
        return (
            <div className="loader">
                <LuLoader size={50} color='0f5bdd'/>
            </div>
        )
    }

    return (
        <div className='App' style={{paddingBottom: '50px'}}>
            <div className="cart">
                
                <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Корзина</h2>
                <div className="cart__items">
                    {basket.map((device) => (
                        <div className="cart__items_card" key={device.deviceId}>
                            <div className="cart__items_card-image">
                                <img src={`${process.env.REACT_APP_API_LINK}${device.details.image}`} alt={device.details.name} />
                            </div>
                            <div className="cart__items_card-details">
                                <div className="cart__items_card-details_name">
                                    {device.details.name}
                                </div>
                                <div className="cart__items_card-details_price">
                                    {device.details.price} ₽
                                </div>
                                <div className="cart__items_card-details_quantity">
                                    <button onClick={() => updateDeviceQuantity(device.deviceId, device.quantity - 1)}>-</button>
                                    <span>
                                        {device.quantity}
                                    </span>
                                    <button onClick={() => updateDeviceQuantity(device.deviceId, device.quantity + 1)}>+</button>
                                </div>
                                <div className="cart__items_card-details_button">
                                    <button onClick={() => deleteDeviceFromBasket(device.deviceId)}>Удалить из корзины</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {
                    basket.length === 0
                    ?
                    <div></div>
                    :
                    <div className="cart__service">
                        <button className='cart__service_clear' onClick={clearBasket}>Очистить корзину</button>
                        <button className='cart__service_order'
                            onClick={() => navigate('/checkout')}
                        >
                            Оформить заказ
                        </button>
                    </div>
                }                
            </div>
            {
                deleteAlert && <Alert text="Товар успешно удален из корзины"/>
            }
        </div>
    );
};

export default CartPage;