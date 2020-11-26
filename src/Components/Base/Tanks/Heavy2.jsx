import React from 'react';
import TankView from "./TankView";
import HeavyGun from '../Guns/HeavyGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Heavy2 extends TankView {
    speed = 13;
    width  = 55;

    view = () => {
        return <>
            <Bubble left={-14} top={8} w={this.width / 2} color={cst.heroColor2}/>
            <Bubble left={14} top={8} w={this.width / 2} color={cst.heroColor2}/>

            <Bubble left={15} top={24} w={this.width / 4} color={cst.heroColor2}/>
            <Bubble left={-15} top={24} w={this.width / 4} color={cst.heroColor2}/>
            <Bubble left={5} top={20} w={this.width / 4} color={cst.heroColor2}/>
            <Bubble left={-5} top={20} w={this.width / 4} color={cst.heroColor2}/>

            <Bubble left={0} top={-5} w={this.width / 1.5} color={cst.heroColor2}/>
            <HeavyGun parent={this.type} offset={{x: -14, y: 0}} tank={this.props.tank}/>
            <HeavyGun parent={this.type} offset={{x: 14, y: 0}} tank={this.props.tank}/>
        </>
    };
}

export default Heavy2;