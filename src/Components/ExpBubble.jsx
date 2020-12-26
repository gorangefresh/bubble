import React from 'react';
import BulletBubble from "./Base/Bubbles/BulletBubble";
import Store from "./Store";
import cst from '../const.js';

class ExpBubble extends React.Component {
    baseSpeed = 25;
    D = 5;
    capture = false;

    setStart = () => {
        setTimeout(() => this.capture = true, 200)
    };

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
            if (!this.targetNumber || !Store.current.enemy[this.targetNumber]) {
                this.targetNumber = this.targetSelection();
            }
            this.target = Store.current.enemy[this.targetNumber].coordinates;
        }

        let a = this.target.x - this.position.x;
        let b = this.target.y - this.position.y;
        let R = Math.sqrt(a ** 2 + b ** 2);
        this.speed.x = a * this.baseSpeed / R;
        this.speed.y = b * this.baseSpeed / R;
        this.turn();
    };

    targetSelection = () => {
        const getMin = obj => {
            let min;
            for (let i in obj) {
                if (!min) {
                    min = i;
                } else {
                    if (obj[i] < obj[min]) min = i;
                }
            }
            return min;
        };

        let enemies = {};
        for (let i in Store.current.enemy) {
            let target = Store.current.enemy[i].coordinates;
            let a = target.x - this.position.x;
            let b = target.y - this.position.y;
            enemies[i] = Math.sqrt(a ** 2 + b ** 2);
        }
        return getMin(enemies);
    };



    move = () => {
        if (!Store.pause) {
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
                Store.travel ||
                Store.touchEdge(this.position.x, this.position.y) ||
                this.hit(this.position.x, this.position.y, this.props.damage)
            ) {
                return this.setState({burst: true});
            }
        }
        setTimeout(this.move, 30);
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
            <BulletBubble w={this.D} color={cst.blue} top={0} left={0}/>
        </>;
    }
}

export default ExpBubble;