//React Imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currentTelegramUser } from '../variables';

//Icons
// import { LuLoader } from 'react-icons/lu';

const CartPage = () => {

    const [basket, setBasket] = useState([]);
    const [loader, setLoader] = useState(true);

    console.log(loader);
    console.log(basket);


    useEffect(() => {
        const fetchBasket = async () => {
            try {
                console.log('Fetching basket for user', currentTelegramUser);
    
                const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/basket/${currentTelegramUser}`)
    
                console.log(response.data);
    
                const data = response.data
    
                if(data && Array.isArray(data.basket_devices)) {
                    setBasket(data.basket_devices)
                } else {
                    setBasket([])
                }
            } catch(error) {
                console.error('Error during fetching basket for user', error);
            } finally {
                setLoader(false);
            }
        }

        fetchBasket()
    },[])

    return (
        <div className='App'>
            <div className="cart">
                <div className="cart__items">
                    {basket.map((device) => (
                        <div className="cart__items_card">
                            <div className="cart__items_card-image">
                                <img src={device.deviceId} alt={device.deviceId} />
                            </div>
                            <div className="cart__items_card-details">
                                <div className="cart__items_card-details_name">
                                    {device.deviceId}
                                </div>
                                <div className="cart__items_card-details_price">
                                    {device.deviceId}
                                </div>
                                <div className="cart__items_card-details_button">
                                    <button>Удалить из корзины</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CartPage;