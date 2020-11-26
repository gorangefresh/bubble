import React from 'react';
import BulletBubble from "../Bubbles/BulletBubble";
import Bullet from "./Bullet";
import cst from "../../../const";

class Mine extends Bullet {
    baseSpeed = 0;
    D = 15;
    lifeTime = 7000;


    view = () => {
        setTimeout(() => {this.hit = () => {return true} }, this.lifeTime);
        let color = cst[this.props.parent + 'BulletColor3'];
        return <>
            <BulletBubble w={this.D} color={color}/>
            <BulletBubble w={5} top={-8} left={-6} color={color}/>
            <BulletBubble w={5} top={0} left={-6} color={color}/>
            <BulletBubble w={5} top={-8} left={6} color={color}/>
            <BulletBubble w={5} top={0} left={6} color={color}/>
            <BulletBubble w={5} top={-11} left={0} color={color}/>
            <BulletBubble w={5} top={2} left={0} color={color}/>
        </>
    };
}

export default Mine;