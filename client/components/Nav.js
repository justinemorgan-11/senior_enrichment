import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="nav">
            <Link to="/"><img src="dxbgrey.png" className="nav-item nav-image" /></Link>
            <Link to="/schools"><div className="nav-item">Schools</div></Link>
            <Link to="/students"><div className="nav-item">Students</div></Link>
            <Link to="/add/students"><div className="nav-item">Add Student</div></Link>
            <Link to="/add/schools"><div className="nav-item">Add School</div></Link>
        </div>
    )
}

export default Nav;