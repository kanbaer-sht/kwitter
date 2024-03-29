import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {
    console.log(userObj);
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/profile">{userObj?`${userObj.displayName}'s Profile`:"Profile"}</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;            