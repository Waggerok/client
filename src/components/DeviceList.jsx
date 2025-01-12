import React from 'react';
import DeviceCard from './UI/DeviceCard/DeviceCard';

const DeviceList = ({devices}) => {

    // const srcForImage = 'http://localhost:5000';

    const ImageSource = 'https://server-production-1e16.up.railway.app/api/devices'

    return (
        <>
           {
                devices.map((device,index) => 
                    <DeviceCard title={device.name} price={device.price} image={ImageSource+device.image} key={index}/>
                )
           }
        </>
    );
};

export default DeviceList;