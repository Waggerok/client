import React, { useEffect, useState } from 'react';
import DeviceList from '../components/DeviceList';
import axios from 'axios';

const devicesSource = 'https://server-production-1e16.up.railway.app/api/devices';

// const devicesSource = 'https://server-production-1e16.up.railway.app/api/devices';

const MainPage = () => {

    const [devices,setDevices] = useState([]);

    useEffect(() => {
        axios
            .get(devicesSource)
            .then((data) => {
                console.log(data.data)
                setDevices(data.data)
            })
    },[])
    return (
        <>
            Main Page
            
            <div className="deviceList">
                <DeviceList devices={devices}/>
            </div>

        </>
    );
};

export default MainPage;