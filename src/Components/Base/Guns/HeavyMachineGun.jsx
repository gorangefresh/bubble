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
            <Bubble color={cst.gunColor2} w={20} left={0} top={15}/>
            <Bubble color={cst.heroBulletColor1} w={15} left={0} top={15}/>
            <Bubble color={cst.gunColor2} w={10} left={6} top={8}/>
            <Bubble color={cst.gunColor2} w={10} left={-6} top={8}/>
            <Bubble color={cst.gunColor2} w={10} left={8} top={3}/>
            <Bubble color={cst.gunColor2} w={10} left={-8} top={3}/>
            <Bubble color={cst.gunColor2} w={10} left={8} top={-3}/>
            <Bubble color={cst.gunColor2} w={10} left={-8} top={-3}/>
        </>
    };
}

export default HeavyMachineGun;