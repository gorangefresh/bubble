import React from 'react';
import MainBubble from '../Base/Bubbles/MainBubble';
import Enemy from "./Enemy";

class FirstEnemy extends Enemy {
    baseSpeed = 1.5;
    width = 40;

    view = () => {
        return <MainBubble w={this.width} color={'#95f7ff'}/>
    };
}

export default FirstEnemy;