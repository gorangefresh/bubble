import React from 'react';
import Tank from "./Tank";
import HeavyMachineGun from '../Guns/HeavyMachineGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Light3 extends Tank {
    speed = 25;
    width  = 50;

    view = () => {
        return <>
            <Bubble left={12} top={7} w={this.width / 2} color={cst.heroColor2}/>
            <Bubble left={-12} top={7} w={this.width / 2} color={cst.heroColor2}/>
            <Bubble left={0} top={-12} w={this.width / 2} color={cst.heroColor2}/>

            <Bubble left={28} top={9} w={this.width / 4} color={cst.heroColor1}/>
            <Bubble left={-28} top={9} w={this.width / 4} color={cst.heroColor1}/>
            <Bubble left={-26} top={15} w={this.width / 4} color={cst.heroColor1}/>
            <Bubble left={26} top={15} w={this.width / 4} color={cst.heroColor1}/>

            <Bubble left={18} top={-10} w={this.width / 4} color={cst.heroColor1}/>
            <Bubble left={-18} top={-10} w={this.width / 4} color={cst.heroColor1}/>
            <HeavyMachineGun parent={this.type} position={{left: '0px', top: '-10px'}}/>
        </>
    };
}

export default Light3;