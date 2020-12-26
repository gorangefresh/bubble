import React from 'react';
import Bubble from '../Base/Bubbles/Bubble';
import Enemy from "./Enemy";
import cst from '../../const';

class PlainEnemy extends Enemy {
    baseSpeed = 4.5;
    width = 30;

    view = () => {
        return <Bubble w={this.width} color={cst.enemyColor1}/>
    };
}

export default PlainEnemy;