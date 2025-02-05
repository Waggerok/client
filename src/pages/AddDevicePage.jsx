import axios from 'axios';
import React, { useState } from 'react';

const AddDevicePage = () => {

    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [model3D, setModel3D] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [imageName, setImageName] = useState('Выберите изображение: .png .jpeg .jpg');
    const [model3DName, setModel3DName] = useState('Выберите 3D модель : .glb')

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
            setImageName('Выберите изображение: .png .jpeg .jpg');
            setModel3DName('Выберите 3D модель : .glb');
        } catch (error) {
            console.error('Ошибка при добавлении устройства', error);
            setMessage('Ошибка при добавлении устройства');
        }
   }

    return (
        <div className='App'>
            <div className="addDevice">
                <div className="addDevice__title">
                    <h2>Добавить устройство</h2>
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
                    <label className='custom-file-upload'>
                        <input 
                            type="file"
                            accept='.jpg,.png,.jpeg'
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                                setImageName(e.target.files[0]?.name || 'Выберите изображение : .png .jpg .jpeg')
                            }} 
                        />
                        {imageName}
                    </label>
                    <label className='custom-file-upload'>
                        <input 
                            type="file"
                            accept='.glb'
                            onChange={(e) => {
                                setModel3D(e.target.files[0]);
                                setModel3DName(e.target.files[0]?.name || 'Выберите 3D модель : .glb')
                            }} 
                        />
                        {model3DName}
                    </label>

                    <button className='addDevice__form_button' type='submit'>Добавить устройство</button>
                </form>                
            </div>
        </div>
    )
}

export default AddDevicePage;