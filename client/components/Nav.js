import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="nav">
            <Link to="/schools"><div className="nav-item">Schools</div></Link>
            <Link to="/students"><div className="nav-item">Students</div></Link>
        </div>
    )
}

export default Nav;