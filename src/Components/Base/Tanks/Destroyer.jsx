import React from 'react';
import Tank from "./Tank";
import RocketLauncher from '../Guns/RocketLauncher';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Destroyer extends Tank {
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

            <RocketLauncher parent={this.type} position={{left: '20px', top: '-20px'}} damage={3} angle={45}/>
            <RocketLauncher parent={this.type} position={{left: '20px', top: '20px'}} damage={3} angle={135}/>
            <RocketLauncher parent={this.type} position={{left: '-20px', top: '20px'}} damage={3} angle={225}/>
            <RocketLauncher parent={this.type} position={{left: '-20px', top: '-20px'}} damage={3} angle={315}/>
        </>
    };
}

export default Destroyer;