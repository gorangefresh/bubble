import React, {useState} from 'react';
import StartButton from './StartButton';
import Playground from './Playground';
import './Menu.scss';

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
            <Playground/>
        );
    }
}

export default Menu;