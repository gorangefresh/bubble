import React from 'react';
import TankView from "./TankView";
import HeavyMachineGun from '../Guns/HeavyMachineGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Light3 extends TankView {
    speed = 25;
    width  = 40;

    view = () => {
        return <>
            <Bubble left={12}  top={7}   w={25} color={cst.heroColor2}/>
            <Bubble left={-12} top={7}   w={25} color={cst.heroColor2}/>
            <Bubble left={0}   top={-12} w={25} color={cst.heroColor2}/>

            <Bubble left={24}  top={9}  w={10} color={cst.color5}/>
            <Bubble left={-24} top={9}  w={10} color={cst.color5}/>
            <Bubble left={-22} top={15} w={10} color={cst.color5}/>
            <Bubble left={22}  top={15} w={10} color={cst.color5}/>
            <Bubble left={-12} top={15} w={10} color={cst.color5}/>
            <Bubble left={12}  top={15} w={10} color={cst.color5}/>

            <HeavyMachineGun parent={this.type} offset={{x:0, y:-10}} tank={this.props.tank}/>
        </>
    };
}

export default Light3;