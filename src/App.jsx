import React, { useEffect } from 'react';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import Header from './components/Header';

const tg = window.Telegram.WebApp;

function App() {

    useEffect(() => {
        tg.ready();
        tg.expand();
    },[])

    return (
        <BrowserRouter>
            <Header/>
            <Navbar/>
            <div style={{ height: '100%', overflow: 'hidden' }}>
                <AppRouter/>
            </div>
        </BrowserRouter>
    )
}
export default App;