//React Imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currentTelegramUser } from '../variables';

//Icons
import { LuLoader } from 'react-icons/lu';

const CartPage = () => {

    const [basket, setBasket] = useState([]);
    const [loader, setLoader] = useState(true);

    console.log(loader);
    console.log(basket);


    useEffect(() => {
        const fetchBasket = async () => {
            try {
                console.log('Fetching basket for user', currentTelegramUser);
    
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
                setLoader(false);
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

            alert('Товар успешно удален из корзины');
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

            alert('Ваша корзина очищена!');
        } catch(error) {
            console.error('Error during clearing the basket', error);
            alert('Не удалось очистить корзину')
        }
    }

    if (!basket || basket.length === 0) {
        return (
            <div style={{textAlign: 'center', marginTop: '45%'}}>Ваша корзина пуста</div>
        )
    }

    return (
        <div className='App'>
            <div className="cart">
                {
                    loader
                    ?
                    <div className="loader">
                        <LuLoader/>
                    </div>
                    :
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
                                    <div className="cart__items_card-details_button">
                                        <button onClick={() => deleteDeviceFromBasket(device.deviceId)}>Удалить из корзины</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                
                {
                    basket.length === 0
                    ?
                    <div></div>
                    :
                    <div className="cart__clear">
                        <button onClick={clearBasket}>Очистить корзину</button>
                    </div>
                }
                
            </div>
        </div>
    );
};

export default CartPage;