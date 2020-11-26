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

            let gunPosition = this.gun.current.getBoundingClientRect();
            let tankPosition = this.props.tank.current.getBoundingClientRect();

            Store.bullets[id] = React.createElement(
                this.bullet,
                {
                    parent: this.props.parent,
                    key: id,
                    id: id,
                    gunPosition,
                    tankPosition,
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
            <Bubble color={cst.orange} w={20} left={0} top={2}/>
            <Bubble color={cst.orange} w={12} left={0} top={-10}/>
        </>
    };

    render() {
        const {x,y} = this.props.offset;

        return (
            <div className={'gun'} ref={this.gun} style={{left: `${x}px`, top: `${y}px`}}>
                {this.view()}
            </div>
        );
    }
}

export default Gun;