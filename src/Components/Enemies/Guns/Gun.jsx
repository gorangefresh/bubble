import React from 'react';
import GunBubble from '../../Base/Bubbles/GunBubble';
import Bullet from '../../Base/Bullets/Bullet';
import Store from "../../Store";


class Gun extends React.Component {
    fireRate = 1300;
    damage = 1;

    gun = React.createRef();

    componentDidMount() {
        setTimeout(this.shoot, this.fireRate * Math.random());
    }

    shoot = () => {
        if (this.gun.current) {
            let id = Store.getId('bullet', this.props.parent);
            let pos = this.props.tank.current.getBoundingClientRect();
            Store.bullets[id] = <Bullet
                parent={this.props.parent}
                key={id}
                id={id}
                coordinates={pos}
                tank={pos}
                damage={this.damage}
                target={Store.mainTank}
            />;
            Store.updateBulletPlace(id);
        }
        setTimeout(this.shoot, this.fireRate);
    };

    render() {

        return (
            <div className={'gun'} ref={this.gun} style={this.props.position}>
                <GunBubble w={20} left={0} top={2}/>
                <GunBubble w={12} left={0} top={-10}/>
            </div>
        );
    }
}

export default Gun;