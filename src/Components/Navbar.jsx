import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const { pathname } = useLocation();

    console.log(pathname);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    // useEffect(() => {
    //     fetch('http://localhost:3214/posts',
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 "id": "4",
    //                 "title": "a title",
    //                 "views": 400

    //             })
    //         })
    // }, [])


    return (
        <>
            <nav className="navbar">
                <div className="logo">Alemeno</div>

                <ul className="navlinks">
                    <li>
                        <Link to='/'

                            className={pathname === '/' ? 'active' : ''}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to='/courses-list'

                            className={pathname === '/courses-list' ? 'active' : ''}
                        >
                            Courses List
                        </Link>
                    </li>


                </ul>

                <div className="bars">
                    <button
                        className="bars-btn"
                        onClick={toggleMobileMenu}
                    >
                        &#9776;
                    </button>
                </div>

                {isMobileMenuOpen && <ul className="navlinks-mobile">
                    <li>
                        <Link to='/'
                            className={pathname === '/' ? 'active' : ''}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to='/courses-list'
                            className={pathname === '/courses-list' ? 'active' : ''}
                        >
                            Courses List
                        </Link>
                    </li>


                </ul>}
            </nav>
        </>
    )
}

export default Navbar;

