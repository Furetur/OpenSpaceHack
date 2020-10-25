import React from 'react'
import { useSelector } from 'react-redux'
import { selectMyMoney } from '../../users.slice'
import styles from './MyMoney.module.css'

const MyMoney = () => {
    const money = useSelector(selectMyMoney)

    return <span className={styles.MyMoney}>Money: {money}</span>
}

export default MyMoney
