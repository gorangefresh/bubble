import React from 'react';
import TankView from "./TankView";
import MachineGun from '../Guns/MachineGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Light2 extends TankView {
    speed = 25;
    width  = 40;

    view = () => {
        return <>
            <Bubble left={12} top={7} w={this.width / 1.5} color={cst.heroColor2}/>
            <Bubble left={-12} top={7} w={this.width / 1.5} color={cst.heroColor2}/>
            <Bubble left={0} top={-12} w={this.width / 1.5} color={cst.heroColor2}/>
            <MachineGun parent={this.type} offset={{x: 10, y: 0}} tank={this.props.tank}/>
            <MachineGun parent={this.type} offset={{x: -10, y: 0}} tank={this.props.tank}/>
        </>
    };
}

export default Light2;