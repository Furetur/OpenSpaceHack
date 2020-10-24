import React, {useEffect} from 'react'
import html from './vanilla/tamagochi.html'
import './vanilla/style.css'
import {main} from "./vanilla/script";


const Tamagochi = () => {
    useEffect(main, [])
    return (
        <div dangerouslySetInnerHTML={{__html: html}} />
    )
}

export default Tamagochi
