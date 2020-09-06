import React from 'react';
import Tank from "./Tank";
import BaseGun from '../Guns/BaseGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Balanced1 extends Tank {
    speed = 20;
    width  = 40;

    view = () => {
        return <>
            <Bubble left={12} top={7} w={this.width / 1.5} color={cst.heroColor2}/>
            <Bubble left={-12} top={7} w={this.width / 1.5} color={cst.heroColor2}/>
            <BaseGun parent={this.type} position={{left: '10px', top: '0px'}}/>
            <BaseGun parent={this.type} position={{left: '-10px', top: '0px'}}/>
        </>
    };
}

export default Balanced1;