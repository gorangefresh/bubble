import React from 'react';
import Bubble from '../../Base/Bubbles/Bubble';
import Bullet from '../../Base/Bullets/Bullet';
import Store from "../../Store";
import cst from '../../../const.js';


class Gun extends React.Component {
    fireRate = 1300;
    damage = 1;
    bullet = Bullet;

    gun = React.createRef();

    componentDidMount() {
        setTimeout(this.shoot, this.fireRate * Math.random());
    }

    shoot = () => {
        if (this.gun.current && !Store.pause) {
            let id = Store.getId('bullet', this.props.parent);
            let pos = this.gun.current.getBoundingClientRect();
            Store.bullets[id] = React.createElement(
                this.bullet,
                {
                    parent: this.props.parent,
                    key: id,
                    id: id,
                    coordinates: pos,
                    tank: pos,
                    damage: this.damage,
                    target: Store.mainTank
                }
            );
            Store.updateBulletPlace(id);
        }
        setTimeout(this.shoot, this.fireRate);
    };

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

export default Gun;