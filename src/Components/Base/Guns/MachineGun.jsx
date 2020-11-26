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
            <Bubble color={cst.gunColor2} w={15} left={0} top={8}/>
            <Bubble color={cst.gunColor2} w={15} left={0} top={0}/>
            <Bubble color={cst.gunColor2} w={10} left={0} top={-10}/>
            <Bubble color={cst.heroBulletColor1} w={10} left={0} top={5}/>
            <Bubble color={cst.heroBulletColor1} w={10} left={0} top={1}/>
        </>
    };

}

export default MachineGun;