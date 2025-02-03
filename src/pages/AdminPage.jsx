import React from 'react';

const AdminPage = () => {
    return (
        <div className='App'>
            <h2 style={{ marginTop: '10px', textAlign: 'center' }}>Админ панель</h2>
            <div className="admin">
                <div className="admin__buttons">
                    <button style={{ backgroundColor: '#0f5bdd', color: 'white' }}>Добавить устройство</button>
                    <button style={{ backgroundColor: 'white', color: 'red', border: '1px solid red' }}>Удалить устройство</button>
                    <button style={{ backgroundColor: '#0f5bdd', color: 'white' }}>Редактировать устройство</button>
                    <button style={{ backgroundColor: '#0f5bdd', color: 'white' }}>Назначить админа</button>
                    <button style={{ backgroundColor: 'white', color: 'red', border: '1px solid red' }}>Удалить админа</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;