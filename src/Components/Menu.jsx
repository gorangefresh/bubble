import React, {useState} from 'react';
import StartButton from './StartButton';
import './Menu.scss';
import Screen from "./Screen";

function Menu() {
    const [status = 'play', setStatus] = useState();

    const changeStatus = () => {
        setStatus('play')
    };

    if (status === 'menu') {
        return (
            <StartButton onclick={changeStatus}/>
        );
    } else if (status === 'play') {
        return (
            <Screen/>
        );
    }
}

export default Menu;