import React from 'react';
import Tank from "./Tank";
import RocketLauncher from '../Guns/RocketLauncher';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Balanced2 extends Tank {
    speed = 20;
    width  = 40;

    view = () => {
        return <>
            <Bubble left={15} top={-12} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-15} top={-12} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={20} top={0} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-20} top={0} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={13} top={11} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={-13} top={11} w={this.width / 3} color={cst.heroColor2}/>
            <Bubble left={0} top={20} w={this.width / 2} color={cst.heroColor2}/>

            <RocketLauncher parent={this.type} position={{left: '0px', top: '5px'}}/>
            {/*<BaseGun parent={this.type} position={{left: '10px', top: '0px'}}/>*/}
        </>
    };
}

export default Balanced2;