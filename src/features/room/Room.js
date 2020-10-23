import React, {useEffect} from 'react'
import html from './vanilla/room.html'
import './vanilla/room.css'
import {main} from "./vanilla/room";


const Room = () => {
    useEffect(main, [])
    return (
        <div dangerouslySetInnerHTML={{__html: html}} />
    )
}

export default Room
