//React imports
import React from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import DeviceCard from './UI/DeviceCard/DeviceCard';

const DeviceList = ({devices}) => {

    const navigate = useNavigate();

    return (
        <>
           {
                devices.map((device,index) => 
                    <DeviceCard 
                        title={device.name}
                        price={device.price}
                        image={process.env.REACT_APP_API_LINK+device.image}
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