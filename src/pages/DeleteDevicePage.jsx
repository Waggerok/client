import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DeleteDevicePage = () => {

    const [devices,setDevices] = useState([]);

    useEffect(() => {
        fetchDevices();
       },[])

    const fetchDevices = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/devices`);
            console.log('Устройства получены', response.data)
            
            if (Array.isArray(response.data)) {
                setDevices(response.data);
            } else {
                console.error('Данные получены некорректно', response.data);
                setDevices([]);
            }
        } catch(error) {
            console.error('Error during fetching devices', error);
            setDevices([]);
        }
    }

    const deleteDevice = async (deviceId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_LINK}/api/devices/${deviceId}`)
            console.log(`Устройство ${deviceId} удалено`);

            fetchDevices();
        } catch(error) {
            console.error('Error during deleting device', error);
        }
    }


    return (
        <div className='App'>
            <div className="deleteDevice">
                <div className="deleteDevice__title">
                    <h2>Удалите устройство</h2>
                </div>
                <div className="deleteDevice__list">
                    {Array.isArray && devices.length > 0 ? (
                        devices.map((device) => (
                            <div
                                className="deleteDevice__list_item"
                                onClick={() => deleteDevice(device.id)}
                                key={device.id}
                            >
                                <div className="deleteDevice__list_item-id">
                                    {device.id}
                                </div>
                                <div className="deleteDevice__list_item-name">
                                    {device.name}
                                </div>
                                <div className="deleteDevice__list_item-price">
                                    {device.price}
                                </div>
                            </div>
                        ))
                    )
                    :
                        <p style={{textAlign: 'center'}}>Нет устройств</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default DeleteDevicePage;