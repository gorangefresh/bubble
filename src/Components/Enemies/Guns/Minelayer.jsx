import React from 'react';
import Bubble from '../../Base/Bubbles/Bubble';
import cst from '../../../const.js';
import Gun from "./Gun";
import Mine from "../../Base/Bullets/Mine";

class Minelayer extends Gun {
    fireRate = 1300;
    damage = 5;
    bullet = Mine;

    view = () => {
        return <>
            <Bubble color={cst.gunColor2} w={15} left={12} top={0}/>
            <Bubble color={cst.gunColor2} w={15} left={-12} top={0}/>
            <Bubble color={cst.gunColor3} w={10} left={-6} top={-1} class={'anim-run'}/>
        </>
    };
}

export default Minelayer;