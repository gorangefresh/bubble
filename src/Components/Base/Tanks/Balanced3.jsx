import React from 'react';
import TankView from "./TankView";
import RocketLauncher from '../Guns/RocketLauncher';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Balanced3 extends TankView {
    speed = 20;
    width  = 40;

    view = () => {
        return <>
            <Bubble left={22} top={-8} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-22} top={-8} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={17} top={2} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-17} top={2} w={this.width / 3} color={cst.heroColor2}/>

            <Bubble left={0} top={-12} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={5} top={2} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-5} top={2} w={this.width / 3} color={cst.heroColor2}/>

            <Bubble left={10} top={11} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-10} top={11} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={0} top={18} w={this.width / 2} color={cst.heroColor2}/>

            <RocketLauncher parent={this.type} offset={{x: 10, y: -5}} tank={this.props.tank}/>
            <RocketLauncher parent={this.type} offset={{x: -10, y: -5}} tank={this.props.tank}/>
        </>
    };
}

export default Balanced3;