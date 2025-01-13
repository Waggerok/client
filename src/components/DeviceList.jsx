import React from 'react';
import DeviceCard from './UI/DeviceCard/DeviceCard';

const DeviceList = ({devices}) => {

    const ImageSource = 'https://server-production-1e16.up.railway.app'

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