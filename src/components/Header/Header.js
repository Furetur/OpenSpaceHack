import React from 'react'
import logo from './img/logo.png'
import styles from './Header.module.css'
import {Link} from "react-router-dom";
import MyMoney from "../../features/users/components/MyMoney/MyMoney";

const Header = () => {
    return (
        <div className={styles.Header}>
            <div className={styles.logo}>
                <Link to="/reports">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <ul className={styles.links}>
                <li>
                    <Link to="/shop" className={styles.link}>
                        Shop
                    </Link>
                </li>
            </ul>
            <MyMoney />
            <div className={styles.profile} />
        </div>
    )
}

export default Header