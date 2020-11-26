import React from 'react';
import Bubble from '../Bubbles/GunBubble';
import BigBullet from '../Bullets/BigBullet';
import cst from '../../../const.js';
import BaseGun from './BaseGun';

class MachineGun extends BaseGun {
    fireRate = 400;
    damage = 3;
    bullet = BigBullet;

    view = () => {
        return <>
            <Bubble color={cst.color5} w={20} left={0} top={10}/>
            <Bubble color={cst.pink} w={15} left={0} top={10}/>
            <Bubble color={cst.color5} w={10} left={10} top={-3}/>
            <Bubble color={cst.color5} w={10} left={-10} top={-3}/>
        </>
    };

}

export default MachineGun;