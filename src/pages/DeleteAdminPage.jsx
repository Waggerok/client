import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DeleteAdminPage = () => {

    const [admins,setAdmins] = useState([])

    useEffect(() => {
        fetchAdmins();
    },[])

    const fetchAdmins = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/user/getAdmins`)
            console.log('Администраторы получены', response.data);

            if(Array.isArray(response.data)) {
                setAdmins(response.data);
            } else {
                console.error('Получены некорректные данные', response.data);
                setAdmins([]);
            }
        } catch(error) {
            console.error('Error during fetching admins', error)
            setAdmins([])
        }
    }

    const assignUser = async (telegram_id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_LINK}/api/user/assignUser/${telegram_id}`);
            console.log('Пользователь больше не является администратором');

            fetchAdmins();
        } catch (error) {
            console.error('Error during assigning user role', error);
        }
    }

    return (
        <div className='App'>
            <div className="deleteAdmin">
                <div className="deleteAdmin__title">
                    <h2>Удалить администратора</h2>
                </div>
                <div className="deleteAdmin__list">
                    {
                        Array.isArray(admins) && admins.length > 0 ? (
                            admins.map((admin) => (
                                <div 
                                    className='deleteAdmin__list_item'
                                    key={admin.id}
                                    onClick={() => assignUser(admin.telegram_id)}
                                >
                                    <div className="deleteAdmin__list_item-name">
                                        {admin.telegram_id}                                        
                                    </div>
                                    <div className="deleteAdmin__list_item-role">
                                        {admin.role}
                                    </div>
                                </div>
                            ))
                        )
                        :
                        <p>Нет администраторов</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default DeleteAdminPage;