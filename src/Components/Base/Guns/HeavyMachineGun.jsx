import React from 'react';
import Bubble from '../Bubbles/GunBubble';
import BigBullet from '../Bullets/BigBullet';
import cst from '../../../const.js';
import BaseGun from './BaseGun';

class HeavyMachineGun extends BaseGun {
    fireRate = 230;
    damage = 3;
    bullet = BigBullet;

    view = () => {
        return <>
            <Bubble color={cst.gunColor1} w={20} left={0} top={10}/>
            <Bubble color={cst.gunColor1} w={20} left={0} top={18}/>
            <Bubble color={cst.gunColor1} w={10} left={10} top={-3}/>
            <Bubble color={cst.gunColor1} w={10} left={-10} top={-3}/>
        </>
    };

}

export default HeavyMachineGun;