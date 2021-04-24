import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Dropdown,
    Menu,
} from 'semantic-ui-react'


export function Topbar() {
    const profile = useSelector(state => state.authentication);
    let profile_name = ''
    let profile_surname = ''

    if (profile.data !== undefined) {
        profile_name = profile.data.first_name
        profile_surname = profile.data.last_name
    }

    return (
        <Menu fixed='top' >
            <Menu.Menu position='left'>
                {profile.data && <Menu.Item as={Link} to='/'>Home</Menu.Item>}
            </Menu.Menu>
            <Menu.Menu position='right'>
                {profile.data ? <Menu.Item as={Link} to='/admin'>Admin</Menu.Item> : <Menu.Item as={Link} to='/login'>Login</Menu.Item>}
                {profile.data && <Dropdown item simple text={`${profile_name} ${profile_surname}`} >
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to='/login'>Выйти</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            </Menu.Menu>
        </Menu>
    );
}