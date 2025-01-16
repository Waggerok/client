import React from 'react';

import { MdOutlineDevices } from 'react-icons/md';

const Header = () => {
    return(
        <div className="header">
            <div className="header__logo">
                <MdOutlineDevices size={50} color='#0f5bdd'/>
            </div>
        </div>
    )
};

export default Header;