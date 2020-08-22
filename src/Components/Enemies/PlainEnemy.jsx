import React from 'react';
import Bubble from '../Base/Bubbles/Bubble';
import Enemy from "./Enemy";
import cst from '../../const';
import Store from "../Store";


class PlainEnemy extends Enemy {
    baseSpeed = 1.5;
    width = 30;

    move = () => {
        if (!this.state.burst) {
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

            if (this.tank.current) setTimeout(this.move, 10);
        }
    };

    view = () => {
        return <Bubble w={this.width} color={cst.enemyColor1}/>
    };
}

export default PlainEnemy;