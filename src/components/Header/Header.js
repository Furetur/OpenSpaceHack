import React from 'react'
import logo from './img/logo.png'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.Header}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo" />
            </div>
            <div className={styles.profile} />
        </div>
    )
}

export default Header