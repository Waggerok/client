import axios from 'axios';
import React, { useState } from 'react';

const AddDevicePage = () => {

    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [model3D, setModel3D] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('')

   const addDevice = async (e) => {
        e.preventDefault();

        if (!name || !description || !price || !image || !model3D || !quantity) {
            setMessage('Заполните все поля');
            return;
        };

        const formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('image',image);
        formData.append('model3D',model3D);
        formData.append('quantity',quantity);
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/devices/`, formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            });

            console.log('Устройство успешно добавлено', response.data);
            setMessage('Устройство успешно добавлено');
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setImage(null);
            setModel3D(null);
        } catch (error) {
            console.error('Ошибка при добавлении устройства', error);
            setMessage('Ошибка при добавлении устройства');
        }
   }

    return (
        <div className='App'>
            <div className="addDevice">
                <div className="addDevice__title">
                    Добавить устройство
                </div>
                {message && <p style={{ color: message.includes('Ошибка') ? 'red' : 'green'}}>{message}</p>}
                <form onSubmit={addDevice} className='addDevice__form'>
                    <input 
                        type="text"
                        placeholder='Название устройства'
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <textarea
                        placeholder='Описание'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder='Цена'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder='Количество'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)} 
                    />
                    <input 
                        type="file"
                        accept='.jpg,.png'
                        value={image}
                        onChange={(e) => setImage(e.target.files[0])} 
                    />
                    <input 
                        type="file"
                        accept='.glb,.gltf'
                        value={image}
                        onChange={(e) => setModel3D(e.target.files[0])} 
                    />
                    <button className='addDevice__form_button' type='submit'>Добавить устройство</button>
                </form>                
            </div>
        </div>
    )
}

export default AddDevicePage;