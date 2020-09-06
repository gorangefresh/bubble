import React from 'react';
import BulletBubble from "../Bubbles/BulletBubble";
import Store from "../../Store";
import cst from '../../../const.js';
import Bullet from "./Bullet";

class BulletHunter extends Bullet {
    baseSpeed = 3;
    D = 15;
    capture = false;

    setStart = () => {
        setTimeout(() => this.capture = true, 200)
    };

    targetCapture = number => Store.current.enemy[number].coordinates;

    getSpeed = target => {
        if (target) {
            this.target = JSON.parse(JSON.stringify(target));
            this.target.x -= Store.currentBasePosition.x;
            this.target.y -= Store.currentBasePosition.y;
        } else {
            let enemies = Object.keys(Store.current.enemy);
            if (enemies.length === 0 && (this.speed.x !== 0 || this.speed.y !== 0)) {
                this.capture = false;
                return;
            }
            this.target = this.targetCapture(enemies[0]);
        }

        let a = this.target.x - this.position.x;
        let b = this.target.y - this.position.y;
        let R = Math.sqrt(a ** 2 + b ** 2);
        this.speed.x = a * this.baseSpeed / R;
        this.speed.y = b * this.baseSpeed / R;
        this.turn();
    };

    move = () => {
        if (this.capture) {
            this.getSpeed();
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (!this.state.burst && this.bullet.current) {
            this.bullet.current.style.left = `${this.position.x}px`;
            this.bullet.current.style.top = `${this.position.y}px`;
        }

        if (
            !Store.travel &&
            !Store.touchEdge(this.position.x, this.position.y) &&
            !this.hit(this.position.x, this.position.y, this.props.damage)
        ) {
            setTimeout(this.move, 10);
        } else {
            this.setState({burst: true});
        }
    };

    turn = () => {
        const getAngle = (center, point) => {
            return 180 * Math.atan2(point.y - center.y, point.x - center.x) / Math.PI + 90;
        };

        let angle = getAngle(this.position, this.target);
        if (this.bullet.current) this.bullet.current.style.transform = `rotate(${angle}deg)`;
    };


    view = () => {
        return <>
            <BulletBubble w={this.D} color={cst.rocketColor} top={2} left={0}/>
            <BulletBubble w={this.D / 1.2} color={cst.rocketColor} top={-4} left={0}/>
            <BulletBubble w={this.D / 2} color={cst.rocketColor} top={6} left={4}/>
            <BulletBubble w={this.D / 2} color={cst.rocketColor} top={6} left={-4}/>
        </>;
    }
}

export default BulletHunter;