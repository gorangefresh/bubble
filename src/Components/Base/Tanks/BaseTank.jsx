import React from 'react';
import TankView from "./TankView";
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";
import BaseGun from "../Guns/BaseGun";

class BaseTank extends TankView {
    speed = 20;
    width = 40;

    view = () => {
        return <>
            <Bubble left={-9} top={6} w={this.width / 3} color={cst.color3}/>
            <Bubble left={9} top={6} w={this.width / 3} color={cst.color3}/>
            <Bubble left={0} top={9} w={this.width / 3} color={cst.color3}/>
            <Bubble left={0} top={-5} w={this.width / 2} color={cst.color3}/>
            <BaseGun parent={this.type} offset={{x: 0, y: -6}} tank={this.props.tank}/>
        </>
    };
}

export default BaseTank;