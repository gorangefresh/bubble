import React from 'react';
import MainBubble from '../Base/Bubbles/MainBubble';
import Gun from "../Base/Guns/Gun";
import Enemy from "./Enemy";

class SecondEnemy extends Enemy {
    baseSpeed = 2;
    width = 40;

    view = () => {
        return <>
            <MainBubble w={this.width} color={'#95f7ff'}/>
            <Gun
                parent={this.type}
                position={{left: '0px', top: '0px'}}
                tank={this.tank}
            />
        </>
    };
}

export default SecondEnemy;