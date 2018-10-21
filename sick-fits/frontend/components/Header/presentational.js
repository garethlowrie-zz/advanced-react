import React from 'react';
import Nav from '../Nav/presentational';

const Header = () => {
    return (
        <div>
            <div className="bar">
                <a href="">Sick Fits</a>
                <Nav />
            </div>
            <div className="subbar">
                <p>Search</p>
            </div>
            <div>Cart</div>
        </div>
    );
};

export default Header;