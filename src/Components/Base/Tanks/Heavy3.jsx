import React from 'react';
import Tank from "./Tank";
import HeavyGun from '../Guns/HeavyGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";
import Minelayer from "../../Enemies/Guns/Minelayer";


class Heavy3 extends Tank {
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
            <HeavyGun parent={this.type} position={{left: '-15px', top: '-5px'}}/>
            <HeavyGun parent={this.type} position={{left: '15px', top: '-5px'}}/>
            <Minelayer parent={this.type} position={{left: '0px', top: '28px'}}/>
        </>
    };
}

export default Heavy3;