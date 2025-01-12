Navbar


Navbar


//React Imports
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';

import axios from 'axios';

//Icons
import { IoHomeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";


const usersSource = 'https://server-production-1e16.up.railway.app/api/user/getUsers';

const Navbar = () => {

    const [isAdmin, setIsAdmin] = useState(true);
    console.log(setIsAdmin);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(usersSource, { withCredentials: true });
                const user = response.data;

                if (user.role === 'ADMIN') {
                    setIsAdmin(true);
                }

            } catch(error) {
                console.error('Ошибка при получении текущего пользователя', error)
            }
        };

        fetchCurrentUser();
    },[]);

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
