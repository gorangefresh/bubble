import React from 'react';
import Bubble from '../Bubbles/GunBubble';
import Bullet from '../Bullets/Bullet';
import cst from '../../../const.js';
import BaseGun from './BaseGun';

class MachineGun extends BaseGun {
    fireRate = 230;
    damage = 1;
    bullet = Bullet;

    view = () => {
        return <>
            <Bubble color={cst.gunColor1} w={15} left={0} top={8}/>
            <Bubble color={cst.gunColor1} w={15} left={0} top={0}/>
            <Bubble color={cst.gunColor1} w={10} left={0} top={-10}/>
        </>
    };

}

export default MachineGun;