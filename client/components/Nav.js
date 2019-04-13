import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="nav">
            <h1>Dubai Schools</h1>
            <Link to="/schools"><div className="nav-item">Schools</div></Link>
            <Link to="/students"><div className="nav-item">Students</div></Link>
            <Link to="/students/add"><div className="nav-item">Add Student</div></Link>
            <Link to="/schools/add"><div className="nav-item">Add School</div></Link>
        </div>

    )
}

export default Nav;