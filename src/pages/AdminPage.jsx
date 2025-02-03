import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {

    const navigate = useNavigate();

    return (
        <div className='App'>
            <h2 style={{ marginTop: '10px', textAlign: 'center' }}>Админ панель</h2>
            <div className="admin">
                <div className="admin__buttons">
                    <button
                        style={{ backgroundColor: '#0f5bdd', color: 'white' }}
                        onClick={() => navigate('/admin/add-device')}
                    >
                        Добавить устройство
                    </button>
                    <button
                        style={{ backgroundColor: '#0f5bdd', color: 'white' }}
                        onClick={() => navigate('/admin/edit-device')}
                    >
                        Редактировать устройство
                    </button>
                    <button 
                        style={{ backgroundColor: '#0f5bdd', color: 'white' }}
                        onClick={() => navigate('/admin/add-admin')}
                    >
                        Назначить админа
                    </button>
                    <button
                        style={{ backgroundColor: 'white', color: 'red', border: '1px solid red' }}
                        onClick={() => navigate('/admin/delete-device')}
                    >
                        Удалить устройство
                    </button>
                    <button 
                        style={{ backgroundColor: 'white', color: 'red', border: '1px solid red' }}
                        onClick={() => navigate('/admin/delete-admin')}
                    >
                        Удалить админа
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;