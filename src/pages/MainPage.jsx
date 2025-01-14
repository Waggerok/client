import React, { useEffect, useState } from 'react';
import DeviceList from '../components/DeviceList';
import axios from 'axios';

const devicesSource = 'https://server-production-1e16.up.railway.app/api/devices';

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
        <div className='App' style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>   
            <div className="deviceList" style={{ flex: 1, overflowY: 'auto' }}>
                <DeviceList devices={devices}/>
            </div>

        </div>
    );
};

export default MainPage;