import React from 'react';
import Bubble from '../../Base/Bubbles/Bubble';
import cst from '../../../const.js';
import Gun from "./Gun";
import BigBullet from "../../Base/Bullets/BigBullet";

class HeavyGun extends Gun {
    fireRate = 1300;
    damage = 3;
    bullet = BigBullet;

    view = () => {
        return <>
            <Bubble color={cst.gunColor1} w={30} left={0} top={2}/>
            <Bubble color={cst.gunColor1} w={20} left={0} top={-12}/>
        </>
    };
}

export default HeavyGun;