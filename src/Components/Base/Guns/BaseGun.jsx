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
            Store.bullets[id] = React.createElement(
                this.bullet,
                {
                    parent: this.props.parent,
                    key: id,
                    id: id,
                    coordinates: this.gun.current.getBoundingClientRect(),
                    tank: Store.mainTank,
                    damage: this.damage,
                    target: Store.mouse
                }
            );
            Store.updateBulletPlace(id);

            setTimeout(this.allowFire, this.fireRate);
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
            <Bubble color={cst.gunColor1} w={20} left={0} top={2}/>
            <Bubble color={cst.gunColor1} w={12} left={0} top={-10}/>
        </>
    };

    render() {
        return (
            <div className={'gun'} ref={this.gun} style={this.props.position}>
                {this.view()}
            </div>
        );
    }
}

export default BaseGun;