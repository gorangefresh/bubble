import React from 'react';
import Bubble from '../../Base/Bubbles/Bubble';
import cst from '../../../const.js';
import Gun from "./Gun";
import Bullet from "../../Base/Bullets/Bullet";

class MachineGun extends Gun {
    fireRate = 200;
    damage = 1;
    bullet = Bullet;

    view = () => {
        return <>
            <Bubble color={cst.gunColor2} w={20} left={0} top={2}/>
            <Bubble color={cst.gunColor2} w={10} left={0} top={-10}/>
        </>
    };
}

export default MachineGun;