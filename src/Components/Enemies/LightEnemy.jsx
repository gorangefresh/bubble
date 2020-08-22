import React from 'react';
import Bubble from '../Base/Bubbles/Bubble';
import Gun from "./Guns/Gun";
import Enemy from "./Enemy";
import cst from '../../const';

class LightEnemy extends Enemy {
    baseSpeed = 2;
    width = 40;


    view = () => {
        return <>
            <Bubble w={this.width} color={cst.enemyColor1}/>
            <Gun
                parent={this.type}
                position={{left: '0px', top: '0px'}}
                tank={this.tank}
            />
        </>
    };
}

export default LightEnemy;