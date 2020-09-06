import React from 'react';
import Tank from "./Tank";
import HeavyGun from '../Guns/HeavyGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Heavy1 extends Tank {
    speed = 15;
    width  = 55;

    view = () => {
        return <>
            <Bubble w={this.width} color={cst.heroColor2}/>
            <HeavyGun parent={this.type} position={{left: '0px', top: '0px'}}/>
        </>
    };
}

export default Heavy1;