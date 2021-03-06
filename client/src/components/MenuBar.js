import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/auth";

const MenuBar = () => {
    const context = useContext(AuthContext)

    const { user, logout } = context;

    const pathname = window.location.pathname;

    const path = pathname === "/" ? "home" : pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);


    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (<Menu size="massive" color="teal" pointing secondary>
        <Menu.Item name={user.username} active as={Link} to="/"/>
        <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={logout}/>
        </Menu.Menu>
    </Menu>) : (<Menu size={'massive'} color={'teal'} pointing secondary>
        <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to={'/'}
        />

        <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to={'/login'}
            />
        </Menu.Menu>

        <Menu.Menu>
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to={'/register'}
            />
        </Menu.Menu>
    </Menu>)

    return (
        <div>
            {menuBar}
        </div>
    )

}
export default MenuBar