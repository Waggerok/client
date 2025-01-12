//React Imports
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';

//Icons
import { IoHomeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import axios from 'axios';


const adminSource = 'https://server-production-1e16.up.railway.app/api/user/getAdmins';
const tg = window.Telegram.WebApp;

const currentUser = tg.initDataUnsafe?.user?.username;
console.log(currentUser);

const Navbar = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {    
        const fetchingAdmins = async() => {
            try {
                const response = await axios.get(adminSource);
                const user = response.data;
                const id = user.telegram_id;
                console.log(id);
                console.log(user);

                if (currentUser === user.telegram_id) {
                    setIsAdmin(true);
                    console.log('Да, он админ')
                } else {
                    setIsAdmin(false);
                }
            } catch(error) {
                console.error('Ошибка при получении роли админа пользователя', error);
            }
        }

        fetchingAdmins();
    },[])


    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="header">
            <nav className='header__navbar'>
                <ul className='header__navbar_links'>
                    <li className={`header__navbar_links-item ${isActive('/main') ? 'active' : ''}`}>
                        <Link to='/main'>
                            <IoHomeOutline size={25}/>
                        </Link>
                    </li>
                    <li className={`header__navbar_links-item ${isActive('/cart') ? 'active' : ''}`}>
                        <Link to='/cart'>
                            <IoCartOutline size={25}/>
                        </Link>
                    </li>
                    <li className={`header__navbar_links-item ${isActive('/orders') ? 'active' : ''}`}>
                        <Link to='/orders'>
                            <CiShoppingBasket size={25}/>
                        </Link>
                    </li>
                    
                    {
                        isAdmin
                        ?
                            <li className={`header__navbar_links-item ${isActive('/admin') ? 'active' : ''}`}>
                                <Link to='/admin'>
                                    <MdAdminPanelSettings size={25}/>
                                </Link>
                            </li>
                        :
                        <p style={{display : 'none'}}></p>
                    }
                    
                    
                    
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;