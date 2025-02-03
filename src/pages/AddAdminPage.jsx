import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddAdminPage = () => {
    
    const [users,setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_LINK}/api/user/getUsers`)
            .then((data) => {
                setUsers(data);
            })
    },[])

    // const assignAdmin = async () => {

    // }
    
    return (
        <div className='App'>
            <div className="addAdmin">
                <div className="addAdmin__title">
                    <h2>Добавить администратора</h2>
                </div>
                <div className="addAdmin__users">
                    {users.map((user) => (
                        <div className='addAdmin__users_item' key={user.id}>
                            <div className="addAdmin__users_item-name">
                                {user.telegram_id}
                            </div>
                            <div className="addAdmin__users_item-role">
                                {user.role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>            
        </div>
    )
}

export default AddAdminPage;