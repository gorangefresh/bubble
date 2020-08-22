import React from 'react';
import BulletBubble from "../Bubbles/BulletBubble";
import Bullet from "./Bullet";

class BigBullet extends Bullet {
    baseSpeed = 4;
    D = 15;

    view = () => {
        return <>
            <BulletBubble w={this.D}/>
            </>
    }
}

export default BigBullet;