import React from 'react';
import Bubble from '../Base/Bubbles/Bubble';
import Enemy from "./Enemy";
import cst from '../../const';
import Store from "../Store";
import Minelayer from "./Guns/Minelayer";

class MinerEnemy extends Enemy {
    baseSpeed = 1.5;
    width = 40;

    turn = () => {
        if (this.tank.current) {
            let angle = this.getAngle(this.tank.current.getBoundingClientRect(), this.destination);
            this.tank.current.style.transform = `rotate(${angle}deg)`;
        }
    };

    componentDidMount() {
        setTimeout(this.getSpeed, 800);
        setTimeout(this.move, 900);
    }

    move = () => {
        if (!this.state.burst) {
            if (!Store.pause) {
                this.position.x += this.speed.x;
                this.position.y += this.speed.y;
                if (this.tank.current) {
                    this.tank.current.style.left = `${this.position.x}px`;
                    this.tank.current.style.top = `${this.position.y}px`;
                    Store.current[this.type][this.props.enemyId].coordinates = {x: this.position.x, y: this.position.y};
                }

                if (Store.touchEdge(this.position.x, this.position.y, this.R)) {
                    this.getSpeed(true);
                }
            }
            if (this.tank.current) setTimeout(this.move, 10);
        }
    };

    getSpeed = (touchEdge) => {
        if (!Store.pause) {
            let x = Math.random() * Store.baseR * this.randomSign();
            let y = Math.random() * Store.baseR * this.randomSign();
            this.destination.x = x + Store.currentBasePosition.x;
            this.destination.y = y + Store.currentBasePosition.y;
            let a = x - this.position.x;
            let b = y - this.position.y;
            let R = Math.sqrt(a ** 2 + b ** 2);
            this.speed.x = a * this.baseSpeed / R;
            this.speed.y = b * this.baseSpeed / R;
            this.turn();
        }
        if (!touchEdge && !this.state.burst) setTimeout(this.getSpeed, Math.random() * this.trajectoryChangeRate)
    };

    view = () => {
        return <>
            <Bubble left={0} top={-10} w={this.width / 1.9} color={cst.enemyColor1}/>
            <Bubble left={17} top={5} w={this.width / 2} color={cst.enemyColor1}/>
            <Bubble left={-17} top={5} w={this.width / 2} color={cst.enemyColor1}/>
            <Bubble left={15} top={20} w={this.width / 2} color={cst.enemyColor2}/>
            <Bubble left={-15} top={20} w={this.width / 2} color={cst.enemyColor2}/>
            <Minelayer
                parent={this.type}
                offset={{x: 0, y: 15}}
                tank={this.tank}/>
        </>
    };
}

export default MinerEnemy;