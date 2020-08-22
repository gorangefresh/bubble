import React from 'react';
import Bubble from '../Base/Bubbles/Bubble';
import Enemy from "./Enemy";
import cst from '../../const';
import MachineGun from "./Guns/MachineGun";

class MachineGunEnemy extends Enemy {
    baseSpeed = 1.5;
    width = 40;

    view = () => {
        return <>
            <Bubble left={12} top={7} w={this.width / 1.5} color={cst.enemyColor1}/>
            <Bubble left={-12} top={7} w={this.width / 1.5} color={cst.enemyColor1}/>
            <Bubble left={0} top={-12} w={this.width / 1.5} color={cst.enemyColor1}/>
            <MachineGun
                parent={this.type}
                position={{left: '0px', top: '0px'}}
                tank={this.tank}
            />
        </>
    };
}

export default MachineGunEnemy;