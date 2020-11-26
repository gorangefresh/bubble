import React from 'react';
import BulletBubble from "../Bubbles/BulletBubble";
import Bullet from "./Bullet";
import cst from "../../../const";

class BigBullet extends Bullet {
    baseSpeed = 4;
    D = 20;

    view = () => {
        return <BulletBubble w={this.D} color={cst[this.props.parent + 'BulletColor2']}/>
    }
}

export default BigBullet;