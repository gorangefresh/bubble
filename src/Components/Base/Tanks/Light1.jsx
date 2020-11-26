import React from 'react';
import TankView from "./TankView";
import MachineGun from '../Guns/MachineGun';
import Bubble from "../Bubbles/Bubble";
import cst from "../../../const";


class Light1 extends TankView {
    speed = 25;
    width  = 40;

    view = () => {
        return <>
            <Bubble left={12} top={7} w={this.width / 1.5} color={cst.heroColor2}/>
            <Bubble left={-12} top={7} w={this.width / 1.5} color={cst.heroColor2}/>
            <Bubble left={0} top={-12} w={this.width / 1.5} color={cst.heroColor2}/>

            {/*<Bubble left={24}  top={9}  w={10} color={cst.color5}/>*/}
            {/*<Bubble left={-24} top={9}  w={10} color={cst.color5}/>*/}
            {/*<Bubble left={-22} top={15} w={10} color={cst.color5}/>*/}
            {/*<Bubble left={22}  top={15} w={10} color={cst.color5}/>*/}
            <Bubble left={-12} top={15} w={10} color={cst.color5}/>
            <Bubble left={12}  top={15} w={10} color={cst.color5}/>

            <MachineGun parent={this.type} offset={{x:0, y:0}} tank={this.props.tank}/>
        </>
    };
}

export default Light1;