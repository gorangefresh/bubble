import React from 'react';
import TankView from "./TankView";
import BaseGun from '../Guns/BaseGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Balanced1 extends TankView {
    speed = 20;
    width  = 40;

    view = () => {
        return <>
            <Bubble left={14} top={-8} w={this.width / 1.8} color={cst.heroColor2}/>
            <Bubble left={-14} top={-8} w={this.width / 1.8} color={cst.heroColor2}/>
            <Bubble left={8} top={5} w={this.width / 2.2} color={cst.heroColor2}/>
            <Bubble left={-8} top={5} w={this.width / 2.2} color={cst.heroColor2}/>
            <Bubble left={0} top={10} w={this.width / 4} color={cst.heroColor2}/>
            <BaseGun parent={this.type} offset={{x: 14, y: -10}} tank={this.props.tank}/>
            <BaseGun parent={this.type} offset={{x: -14, y: -10}} tank={this.props.tank}/>
        </>
    };
}

export default Balanced1;