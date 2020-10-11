import React from 'react';
import Tank from "./Tank";
import MachineGun from '../Guns/MachineGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Light2 extends Tank {
    speed = 25;
    width  = 40;

    view = () => {
        return <>
            <Bubble left={12} top={7} w={this.width / 1.5} color={cst.heroColor2}/>
            <Bubble left={-12} top={7} w={this.width / 1.5} color={cst.heroColor2}/>
            <Bubble left={0} top={-12} w={this.width / 1.5} color={cst.heroColor2}/>
            <MachineGun parent={this.type} position={{left: '10px', top: '0px'}}/>
            <MachineGun parent={this.type} position={{left: '-10px', top: '0px'}}/>
        </>
    };
}

export default Light2;