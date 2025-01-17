import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const devicesSource = 'https://server-production-1e16.up.railway.app/api/devices';
const ImageSource = 'https://server-production-1e16.up.railway.app';


const DevicePage = () => {
    const { id } = useParams();
    const [device,setDevice] = useState(null);

    const [is3D, setIs3D] = useState(false);

    useEffect(() => {
        axios
            .get(`${devicesSource}/${id}`)
            .then((response) => {
                setDevice(response.data)
            })
            .catch((error) => {
                console.error('Error fetching device:', error);
            })
    },[id])

    if (!device) {
        return(
            <div>Loading...</div>
        )
    }
    
    return (
        <div className='App'>
            <div className='device'>
                <div className="device__items">
                    <div className="device__items_image">
                        <img src={ImageSource+device.image} alt={device.name} />
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
                    <button className='buttons__items_3d'>3D</button>
                    <button className='buttons__items_order'>Добавить в корзину</button>
                </div>
            </div>
        </div>
    );
};

export default DevicePage;