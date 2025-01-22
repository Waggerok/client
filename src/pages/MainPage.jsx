//React Imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//Components
import DeviceList from '../components/DeviceList';

//Icons
import { LuLoader } from 'react-icons/lu';

const MainPage = () => {

    const [devices,setDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [loader,setLoader] = useState(true);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_LINK}/api/devices`)
            .then((data) => {
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