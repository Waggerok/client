//React Imports
import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import axios from 'axios';
import Alert from '../components/UI/Alert/Alert';

//Hooks
import usePreventTelegramCollapse from '../hooks/usePreventTelegramCollapse';

//Variables
import { currentTelegramUser } from '../variables'

//Icons
import { LuLoader } from 'react-icons/lu';

const DevicePage = () => {
    usePreventTelegramCollapse();

    const { id } = useParams();
    const [device, setDevice] = useState(null);
    const [is3D, setIs3D] = useState(false);
    const [addAlert, setAddAlert] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_LINK}/api/devices/${id}`)
            .then((response) => {
                setDevice(response.data);
            })
            .catch((error) => {
                console.error('Error fetching device:', error);
            });
    }, [id]);

    useEffect(() => {
        if (!currentTelegramUser) {
            console.error('Ошибка: currentTelegramUser не определен');
            return;
        }
    
        axios.post(`${process.env.REACT_APP_API_LINK}/api/basket/create-basket`, {
            userTelegramId: currentTelegramUser,
        })
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Ошибка при создании корзины:', error.response?.data || error);
        });
    }, []);
    


    if (!device) {
        return (
            <div className='loader'>
                <LuLoader size={50} color='#0f5bdd'/>
            </div>   
        );
    }

    const turnOn3D = () => {
        setIs3D((prev) => !prev);
    };
    
    const addToBasket = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/basket/`, {
                telegram_id : currentTelegramUser,
                deviceId : device.id,
                quantity : 1,
            });

            if (response.data.updated) {
                console.log('Количество товара увеличено')
            } else {
                console.log('Товар добавлен в корзину')
            }

            setAddAlert(true);

            setTimeout(() => {
                setAddAlert(false)
            },2000)
        }
        catch(error) {
            console.error('Error during adding device to basket', error.response?.data || error);
            alert('Ошибка при добавлении товара в корзину');
        }
    }

    return (
        <div className='App'>
            <div className='device'>
                <div className="device__items">
                    <div className="device__items_image">
                        {is3D ? (
                            device.model3D ? (
                                <Canvas 
                                    camera={{ position: [-3, 1, 1], fov: 50 }}
                                >
                                    <ambientLight intensity={0.9} />
                                    <directionalLight position={[0, 20, 0]} intensity={1} />
                                    <directionalLight position={[0, -1, -10]} intensity={1} />
                                    <directionalLight position={[0, -1, 10]} intensity={1} />
                                    <directionalLight position={[0, -20, 0]} intensity={1} />
                                    <OrbitControls />
                                    <Suspense fallback={<mesh />}>
                                        <Model url={process.env.REACT_APP_API_LINK + device.model3D} />
                                    </Suspense>
                                </Canvas>

                            ) : (
                                <div>3D модель недоступна</div>
                            )
                        ) : (
                            <img src={process.env.REACT_APP_API_LINK + device.image} alt={device.name} />
                        )}
                    </div>
                    <div className="device__items_name">
                        <p>{device.name}</p>
                    </div>
                    <div className="device__items_description">
                        Описание: {device.description}
                    </div>
                    <div className="device__items_price">
                        Цена: {device.price} руб.
                    </div>
                </div>
            </div>
            <div className="buttons">
                <div className="buttons__items">
                    <button className={`buttons__items_3D${is3D ? '_active' : ''}`} onClick={turnOn3D}>3D</button>
                    <button className='buttons__items_order' onClick={addToBasket}>Добавить в корзину</button>
                </div>
            </div>
            {
                addAlert && <Alert text="Вы успешно добавили товар в корзину"/>
            }
        </div>
    );
};

const Model = ({ url }) => {
    const { scene, error } = useGLTF(url); // Загружаем GLTF модель
    if (error) {
        console.error("Error loading model:", error);
        return <div>Ошибка загрузки модели</div>;
    }
    return <primitive object={scene} scale={0.5} />;
};

export default DevicePage;
