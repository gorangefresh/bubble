import React from 'react';
import Bubble from '../Base/Bubbles/Bubble';
import Enemy from "./Enemy";
import cst from '../../const';
import HeavyGun from "./Guns/HeavyGun";

class HeavyEnemy extends Enemy {
    baseSpeed = 1;
    width = 60;

    view = () => {
        return <>
            <Bubble w={this.width} color={cst.enemyColor1}/>
            <HeavyGun
                parent={this.type}
                offset={{x: 0, y: 0}}
                tank={this.tank}
            />
        </>
    };
}

export default HeavyEnemy;