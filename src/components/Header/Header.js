import React from 'react'
import logo from './img/logo.png'
import styles from './Header.module.css'
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.Header}>
            <div className={styles.logo}>
                <Link to="/reports">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <div className={styles.profile} />
        </div>
    )
}

export default Header