import React from 'react';
import Tank from "./Tank";
import HeavyGun from '../Guns/HeavyGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Heavy2 extends Tank {
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
            <HeavyGun parent={this.type} position={{left: '-14px', top: '0px'}}/>
            <HeavyGun parent={this.type} position={{left: '14px', top: '0px'}}/>
        </>
    };
}

export default Heavy2;