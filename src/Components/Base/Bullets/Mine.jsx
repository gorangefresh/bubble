import React from 'react';
import BulletBubble from "../Bubbles/BulletBubble";
import Bullet from "./Bullet";

class Mine extends Bullet {
    baseSpeed = 0;
    D = 15;
    lifeTime = 7000;


    view = () => {
        setTimeout(() => {this.hit = () => {return true} }, this.lifeTime);

        return <>
            <BulletBubble w={this.D}/>
            <BulletBubble w={5} top={-8} left={-6}/>
            <BulletBubble w={5} top={0} left={-6}/>
            <BulletBubble w={5} top={-8} left={6}/>
            <BulletBubble w={5} top={0} left={6}/>
            <BulletBubble w={5} top={-11} left={0}/>
            <BulletBubble w={5} top={2} left={0}/>
        </>
    };
}

export default Mine;