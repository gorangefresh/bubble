import React, {useState} from 'react';
import StartButton from './StartButton';
import './Menu.scss';
import Screen from "./Screen";

function Menu() {
    const [status, setStatus] = useState('menu');

    const changeStatus = () => {
        setTimeout(() => setStatus('play'), 100)
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