import React from 'react';
import GunBubble from '../Bubbles/GunBubble';
import Bullet from '../Bullets/Bullet';
import Store from "../../Store";
import cst from '../../../const.js';

class BaseGun extends React.Component {
    fireRate = 400;
    damage = 1;
    bullet = Bullet;

    gun = React.createRef();
    shooting = {mouseDown: false, fire: true};

    startShooting = () => {
        this.shooting.mouseDown = true;
        if (this.shooting.fire) {
            this.shoot();
        }
    };

    shoot = () => {
        this.shooting.fire = false;
        if (this.shooting.mouseDown && !Store.pause) {
            let id = Store.getId('bullet', this.props.parent);

            let target = {};
            let gunPosition = this.gun.current.getBoundingClientRect();
            let tankPosition = this.props.tank.current.getBoundingClientRect();

            if (this.props.angle) {
                this.turn(target, tankPosition, gunPosition);
            } else {
                target.x = Store.mouse.x + gunPosition.x - tankPosition.x;
                target.y = Store.mouse.y + gunPosition.y - tankPosition.y;
            }

            Store.bullets[id] = React.createElement(
                this.bullet,
                {
                    parent: this.props.parent,
                    key: id,
                    id: id,
                    gunPosition,
                    tankPosition,
                    damage: this.damage,
                    target: target,
                    angle: this.props.angle
                }
            );
            Store.updateBulletPlace(id);

            setTimeout(this.allowFire, this.fireRate);
        }
    };

    turn = (target, tankPosition, gunPosition) => {
        if (!Store.pause) {
            let angle = Math.PI * this.props.angle / 180;
            let x = Store.mouse.x - tankPosition.x;
            let y = Store.mouse.y - tankPosition.y;
            target.x = x * Math.cos(angle) - y * Math.sin(angle);
            target.y = x * Math.sin(angle) + y * Math.cos(angle);
            target.x += gunPosition.x;
            target.y += gunPosition.y;
        }
    };

    allowFire = () => {
        this.shooting.fire = true;
        if (this.shooting.mouseDown && this.gun.current) this.shoot();
    };

    stopShooting = () => this.shooting.mouseDown = false;

    componentDidMount() {
        document.addEventListener('mousedown', this.startShooting);
        document.addEventListener('mouseup', this.stopShooting);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.startShooting);
        document.removeEventListener('mouseup', this.stopShooting);
    }

    view = () => {
        return <>
            <GunBubble color={cst.color5} w={15} left={0} top={2}/>
            <GunBubble color={cst.color5} w={10} left={0} top={-10}/>
            <GunBubble color={cst.heroBulletColor1} w={10} left={0} top={1}/>
        </>
    };

    render() {
        let style = {left: `${this.props.offset.x}px`, top: `${this.props.offset.y}px`};

        if (this.props.angle) style.transform = `rotate(${this.props.angle}deg)`;

        return (
            <div className={'gun'} ref={this.gun} style={style}>
                {this.view()}
            </div>
        );
    }
}

export default BaseGun;