import React from 'react';
import Bubble from '../Bubbles/GunBubble';
import BulletHunter from '../Bullets/BulletHunter';
import cst from '../../../const.js';
import BaseGun from './BaseGun';

class RocketLauncher extends BaseGun {
    fireRate = 1000;
    damage = this.props.damage ? this.props.damage : 2;
    bullet = BulletHunter;

    view = () => {
        return <>
            <Bubble color={'black'} w={10} left={0} top={15}/>
            <Bubble color={cst.gunColor2} w={10} left={6} top={0}/>
            <Bubble color={cst.gunColor2} w={10} left={-6} top={0}/>
            <Bubble color={cst.gunColor2} w={10} left={6} top={10}/>
            <Bubble color={cst.gunColor2} w={10} left={-6} top={10}/>
        </>
    };

}

export default RocketLauncher;