import React from 'react';
import TankView from "./TankView";
import RocketLauncher from '../Guns/RocketLauncher';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Destroyer extends TankView {
    speed = 20;
    width  = 40;

    view = () => {
        return <>
            {/*<Bubble left={22} top={-8} w={this.width / 3} color={cst.heroColor2}/>*/}
            {/*<Bubble left={-22} top={-8} w={this.width / 3} color={cst.heroColor2}/>*/}
            <Bubble left={17} top={2} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-17} top={2} w={this.width / 3} color={cst.heroColor2}/>

            <Bubble left={0} top={-9} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={5} top={2} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-5} top={2} w={this.width / 3} color={cst.heroColor2}/>

            <Bubble left={10} top={11} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-10} top={11} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={0} top={18} w={this.width / 2} color={cst.heroColor2}/>

            <RocketLauncher parent={this.type} tank={this.props.tank} damage={3} angle={45}  offset={{x: 20, y: -20}}/>
            <RocketLauncher parent={this.type} tank={this.props.tank} damage={3} angle={135} offset={{x: 20, y: 20}}/>
            <RocketLauncher parent={this.type} tank={this.props.tank} damage={3} angle={225} offset={{x: -20, y: 20}}/>
            <RocketLauncher parent={this.type} tank={this.props.tank} damage={3} angle={315} offset={{x: -20, y: -20}}/>
        </>
    };
}

export default Destroyer;