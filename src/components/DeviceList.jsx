import React from 'react';
import DeviceCard from './UI/DeviceCard/DeviceCard';
import { useNavigate } from 'react-router-dom';

const DeviceList = ({devices}) => {

    const ImageSource = 'https://server-production-1e16.up.railway.app'
    const navigate = useNavigate();

    return (
        <>
           {
                devices.map((device,index) => 
                    <DeviceCard 
                        title={device.name}
                        price={device.price}
                        image={ImageSource+device.image}
                        key={index}
                        id = {device.id}
                        onClick={() => navigate(`/device/${device.id}`)}
                    />
                )
           }
        </>
    );
};

export default DeviceList;