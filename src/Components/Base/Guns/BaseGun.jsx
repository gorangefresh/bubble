import React from 'react';
import Bubble from '../Bubbles/GunBubble';
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
        if (this.shooting.mouseDown) {
            let id = Store.getId('bullet', this.props.parent);

            let target = {};
            let cords = this.gun.current.getBoundingClientRect();

            if (this.props.angle) {
                this.turn(target, cords);
            } else {
                target = Store.mouse;
            }

            Store.bullets[id] = React.createElement(
                this.bullet,
                {
                    parent: this.props.parent,
                    key: id,
                    id: id,
                    coordinates: cords,
                    tank: Store.mainTank,
                    damage: this.damage,
                    target: target,
                    angle: this.props.angle
                }
            );
            Store.updateBulletPlace(id);

            setTimeout(this.allowFire, this.fireRate);
        }
    };

    turn = (target, cords) => {
        let angle = Math.PI * this.props.angle / 180;
        let x = Store.mouse.x - cords.x;
        let y = Store.mouse.y - cords.y;
        target.x = x * Math.cos(angle) - y * Math.sin(angle);
        target.y = x * Math.sin(angle) + y * Math.cos(angle);
        target.x += cords.x;
        target.y += cords.y;
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
            <Bubble color={cst.gunColor1} w={15} left={0} top={2}/>
            <Bubble color={cst.gunColor1} w={10} left={0} top={-10}/>
        </>
    };

    render() {
        let style = this.props.position;
        if (this.props.angle) style.transform = `rotate(${this.props.angle}deg)`;

        return (
            <div className={'gun'} ref={this.gun} style={style}>
                {this.view()}
            </div>
        );
    }
}

export default BaseGun;