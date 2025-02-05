import axios from 'axios';
import React, { useState } from 'react';

const EditDevicePage = () => {

    const [deviceId,setDeviceId] = useState('');
    const [deviceData, setDeviceData] = useState(null);
    const [message, setMessage] = useState('');
    const [imageName, setImageName] = useState('Выберите изображение');
    const [model3DName, setModel3DName] = useState('Выберите 3D модель');


    const fetchDevice = async () => {
        if (!deviceId.trim()) {
            setMessage('Введите Id устройства');
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/devices/${deviceId}`);
            setDeviceData(response.data);
            setMessage('');
        } catch(error) {
            console.error('Ошибка при загрузке устройства', error);
            setMessage('Ошибка при загрузке устройства');
            setDeviceData(null);
        }
    }

    const updateDevice = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', deviceData.name);
        formData.append('description', deviceData.description);
        formData.append('price', deviceData.price);
        formData.append('quantity', deviceData.quantity);

        if (deviceData.image) formData.append('image', deviceData.image);
        if (deviceData.model3D) formData.append('model3D', deviceData.model3D);

        try {
            await axios.put(`${process.env.REACT_APP_API_LINK}/api/devices/${deviceId}`, formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            setMessage('Устройство успешно обновлено');
        } catch(error) {
            console.error('Ошибка при обновлении устройства', error);
            setMessage('Ошибка при обновлении устройства');
        }
    }

    return (
        <div className='App'>
            <div className="editDevice">
                <div className="editDevice__title">
                    <h2>Редактировать устройство</h2>
                </div>
                <div className="editDevice__idName">
                    <input 
                        type="text"
                        placeholder='Введите Id устройства'
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                    />
                    <button onClick={fetchDevice}>Загрузить устройство</button>
                </div>
                

                {message && <p style={{ color : message.includes('Ошибка') ? 'red' : 'green'}}>{message}</p>}

                {deviceData && (
                    <form onSubmit={updateDevice} className='editDevice__form'>
                        <input 
                            type="text"
                            placeholder='Название устройства'
                            value={deviceData.name}
                            onChange={(e) => setDeviceData({ ...deviceData, name : e.target.value })}
                        />
                        <textarea 
                            placeholder='Описание устройства'
                            value={deviceData.description}
                            onChange={(e) => setDeviceData({ ...deviceData, description : e.target.value })}
                        />
                        <input 
                            type="text"
                            placeholder='Цена устройства'
                            value={deviceData.price}
                            onChange={(e) => setDeviceData({ ...deviceData, price : e.target.value })}
                        />
                        <input 
                            type="text"
                            placeholder='Количество устройств'
                            value={deviceData.quantity}
                            onChange={(e) => setDeviceData({ ...deviceData, quantity : e.target.value })}
                        />
                        <label className='custom-file-upload'>
                            <input
                                type="file"
                                accept='.png,.jpg,.jpeg'
                                onChange={(e) => {
                                    setDeviceData({ ...deviceData, image : e.target.files[0] });
                                    setImageName(e.target.files[0]?.name || 'Выберите изображение');
                                }}
                            />
                            {imageName}
                        </label>
                        <label className='custom-file-upload'>
                            <input
                                type='file'
                                accept='.glb,.gltf'
                                onChange={(e) => {
                                    setDeviceData({ ...deviceData, model3D : e.target.files[0] });
                                    setModel3DName(e.target.files[0]?.name || 'Выберите 3D модель');
                                }}
                            />
                            {model3DName}
                        </label>
                       
                        <button className='editDevice__form_button' type='submit'>
                            Сохранить изменения    
                        </button>                       
                    </form>
                )}
            </div>
        </div>
    )
}

export default EditDevicePage;