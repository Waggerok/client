import React, { useEffect, useState } from 'react';
import DeviceList from '../components/DeviceList';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';


const devicesSource = 'https://server-production-1e16.up.railway.app/api/devices';

const MainPage = () => {

    const [devices,setDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [loader,setLoader] = useState(true);

    useEffect(() => {
        axios
            .get(devicesSource)
            .then((data) => {
                console.log(data.data)
                setDevices(data.data)
                setLoader(false);
            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            })
    },[]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = devices.filter(device =>
            device.name.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredDevices(filtered);
    }, [searchQuery, devices]);

    return (
        <div className='App' style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>   
        <div className='searchBar'>
                <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {
                loader 
                ?
                    <div className='loader'>
                        <LuLoader size={50} color='#0f5bdd'/>
                    </div>   
                :
                    <div className="deviceList" style={{ flex: 1, overflowY: 'auto' }}>
                        <DeviceList devices={filteredDevices}/>
                    </div>
            }
            

        </div>
    );
};

export default MainPage;