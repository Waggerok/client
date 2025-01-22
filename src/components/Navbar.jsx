//React Imports
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';

//Icons
import { IoHomeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";

//Variables
import {currentTelegramUser} from '../variables'

console.log(currentTelegramUser);

const Navbar = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {    
        const fetchingAdmins = async() => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/user/getAdmins`);
                const admins = response.data;    
                const currentAdmin = admins.find(admin => admin.telegram_id === currentTelegramUser)

                if (currentAdmin) {
                    setIsAdmin(true);
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
        <div className="menu">
            <nav className='menu__navbar'>
                <ul className='menu__navbar_links'>
                    <li className={`menu__navbar_links-item ${isActive('/') ? 'active' : ''}`}>
                        <Link to='/main'>
                            <IoHomeOutline size={25}/>
                        </Link>
                    </li>
                    <li className={`menu__navbar_links-item ${isActive('/cart') ? 'active' : ''}`}>
                        <Link to='/cart'>
                            <IoCartOutline size={25}/>
                        </Link>
                    </li>
                    <li className={`menu__navbar_links-item ${isActive('/orders') ? 'active' : ''}`}>
                        <Link to='/orders'>
                            <CiShoppingBasket size={25}/>
                        </Link>
                    </li>
                    
                    {
                        isAdmin
                        ?
                            <li className={`menu__navbar_links-item ${isActive('/admin') ? 'active' : ''}`}>
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