import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const devicesSource = 'https://server-production-1e16.up.railway.app/api/devices';

const DevicePage = () => {
    const { id } = useParams();
    const [device,setDevice] = useState(null);

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
        <div>
            <h1>{device.name}</h1>
            <p>{device.description}</p>
            <p>Цена: {device.price} руб.</p>
        </div>
    );
};

export default DevicePage;