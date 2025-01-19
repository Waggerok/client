import React, { useEffect, useState, Suspense } from 'react';
import usePreventTelegramCollapse from '../hooks/usePreventTelegramCollapse';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';

const devicesSource = 'https://server-production-1e16.up.railway.app/api/devices';
const staticSource = 'https://server-production-1e16.up.railway.app';

const DevicePage = () => {
    usePreventTelegramCollapse();

    const { id } = useParams();
    const [device, setDevice] = useState(null);
    const [is3D, setIs3D] = useState(false);

    useEffect(() => {
        axios
            .get(`${devicesSource}/${id}`)
            .then((response) => {
                console.log('Device Data:', response.data); // Для проверки структуры данных
                setDevice(response.data);
            })
            .catch((error) => {
                console.error('Error fetching device:', error);
            });
    }, [id]);

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

    console.log('Device:', device);
    console.log('3D Model URL:', `${staticSource}${device.model3D}`);
    

    return (
        <div className='App'>
            <div className='device'>
                <div className="device__items">
                    <div className="device__items_image">
                        {is3D ? (
                            device.model3D ? (
                                <Canvas 
                                    camera={{ position: [0, 1, 1], fov: 50 }}
                                >
                                    <ambientLight intensity={0.9} />
                                    <directionalLight position={[0, 20, 0]} intensity={1} />
                                    <directionalLight position={[0, -1, -10]} intensity={1} />
                                    <directionalLight position={[0, -1, 10]} intensity={1} />
                                    <directionalLight position={[0, -20, 0]} intensity={1} />
                                    <OrbitControls />
                                    <Suspense fallback={<mesh />}>
                                        <Model url={staticSource + device.model3D} />
                                    </Suspense>
                                </Canvas>


                            ) : (
                                <div>3D модель недоступна</div>
                            )
                        ) : (
                            <img src={staticSource + device.image} alt={device.name} />
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
                    <button className='buttons__items_order'>Добавить в корзину</button>
                </div>
            </div>
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
