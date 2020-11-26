import React from 'react';
import TankView from "./TankView";
import HeavyGun from '../Guns/HeavyGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Heavy1 extends TankView {
    speed = 15;
    width  = 55;

    view = () => {
        return <>
            <Bubble left={-9} top={6} w={this.width / 2} color={cst.heroColor2}/>
            <Bubble left={9} top={6} w={this.width / 2} color={cst.heroColor2}/>
            <Bubble left={0} top={9} w={this.width / 2} color={cst.heroColor2}/>
            <Bubble left={0} top={-5} w={this.width / 1.5} color={cst.heroColor2}/>
            <HeavyGun parent={this.type} offset={{x: 0, y: 0}} tank={this.props.tank}/>
        </>
    };
}

export default Heavy1;