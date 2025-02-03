import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddAdminPage = () => {
    
    const [users,setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_LINK}/api/user/getUsers`)
            .then((response) => {
                console.log('Пользователи получены', response.data)
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении пользователей')
            })
    },[])

    const assignAdmin = async (telegram_id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_LINK}/api/user/assignAdmin/${telegram_id}`)
            console.log('Пользователя теперь является администратором')

            setUsers((prevUsers) => {
                prevUsers.map((user) => 
                    user.telegram_id === telegram_id ? {...user, role: 'ADMIN'} : user
                )
            })
        } catch(error) {
            console.error('Error during assigning admin', error);
        }
    }
    
    return (
        <div className='App'>
            <div className="addAdmin">
                <div className="addAdmin__title">
                    <h2>Добавить администратора</h2>
                </div>
                <div className="addAdmin__users">
                    
                    {
                        Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <div 
                                className='addAdmin__users_item' 
                                key={user.id}
                                onClick={() => assignAdmin(user.telegram_id)}
                                style={{
                                    backgroundColor : user.role === 'ADMIN' ? '#0f5bdd' : 'white',
                                    color : user.role === 'ADMIN' ? 'white' : 'black'
                                }}
                                >
                                    <div className="addAdmin__users_item-name">
                                        {user.telegram_id}
                                    </div>
                                    <div className="addAdmin__users_item-role">
                                        {user.role}
                                    </div>
                                </div>
                            ))
                        )
                        :
                        <p>Нет пользователей</p>
                    }
                </div>
            </div>            
        </div>
    )
}

export default AddAdminPage;