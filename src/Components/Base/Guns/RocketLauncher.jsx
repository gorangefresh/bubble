import React from 'react';
import GunBubble from '../Bubbles/GunBubble';
import BulletHunter from '../Bullets/BulletHunter';
import cst from '../../../const.js';
import BaseGun from './BaseGun';

class RocketLauncher extends BaseGun {
    fireRate = 1000;
    damage = this.props.damage ? this.props.damage : 2;
    bullet = BulletHunter;

    view = () => {
        return <>
            <GunBubble color={cst.gunColor2} w={14} left={0} top={15}/>
            <GunBubble color={cst.gunColor2} w={7} left={5} top={0}/>
            <GunBubble color={cst.gunColor2} w={7} left={-5} top={0}/>
            <GunBubble color={cst.gunColor2} w={7} left={6} top={5}/>
            <GunBubble color={cst.gunColor2} w={7} left={-6} top={5}/>
            <GunBubble color={cst.gunColor2} w={7} left={5} top={10}/>
            <GunBubble color={cst.gunColor2} w={7} left={-5} top={10}/>
            <GunBubble color={cst.heroBulletColor1} w={9} left={0} top={13}/>
        </>
    };

}

export default RocketLauncher;