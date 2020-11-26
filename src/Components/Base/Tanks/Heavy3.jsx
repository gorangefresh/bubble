import React from 'react';
import TankView from "./TankView";
import HeavyGun from '../Guns/HeavyGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";
import Minelayer from "../../Enemies/Guns/Minelayer";


class Heavy3 extends TankView {
    speed = 12;
    width  = 55;

    view = () => {
        return <>
            <Bubble left={-14} top={6} w={this.width / 2} color={cst.heroColor2}/>
            <Bubble left={14} top={6} w={this.width / 2} color={cst.heroColor2}/>

            <Bubble left={15} top={22} w={this.width / 4} color={cst.heroColor2}/>
            <Bubble left={-15} top={22} w={this.width / 4} color={cst.heroColor2}/>
            {/*<Bubble left={5} top={20} w={this.width / 4} color={cst.heroColor2}/>*/}
            {/*<Bubble left={-5} top={20} w={this.width / 4} color={cst.heroColor2}/>*/}

            <Bubble left={0} top={-7} w={this.width / 1.5} color={cst.heroColor2}/>
            <HeavyGun parent={this.type} offset={{x:-15, y:-5}} tank={this.props.tank}/>
            <HeavyGun parent={this.type} offset={{x:15, y:-5}} tank={this.props.tank}/>
            <Minelayer parent={this.type} offset={{x:0, y:28}} tank={this.props.tank}/>
        </>
    };
}

export default Heavy3;