import React from 'react';
import BulletBubble from "../Bubbles/BulletBubble";
import Store from "../../Store";
import cst from '../../../const.js';

class Bullet extends React.Component {
    baseSpeed = 6;
    D = 10;

    bullet = React.createRef();
    speed = {x: 0, y: 0};
    hit = this.props.parent === 'hero' ? Store.hit : Store.enemyHit;

    constructor(props) {
        super(props);

        this.state = {
            burst: false
        };
        this.position = {};

        if (this.props.gunPosition && Store.currentBasePosition) {
            this.position.x = props.gunPosition.x - Store.currentBasePosition.x;
            this.position.y = props.gunPosition.y - Store.currentBasePosition.y;
        }
    }

    componentDidMount() {
        this.getSpeed(this.props.target);
        this.baseSpeed !== 0 ? this.move() : this.stay();
        if (typeof this.setStart === 'function') this.setStart();
    }

    componentDidUpdate() {
        if (this.state.burst) delete Store.bullets[this.props.id];
    }

    getSpeed = target => {
        const {gunPosition} = this.props;

        let a = target.x - gunPosition.x;
        let b = target.y - gunPosition.y;
        let R = Math.sqrt(a ** 2 + b ** 2);
        this.speed.x = a * this.baseSpeed / R;
        this.speed.y = b * this.baseSpeed / R;
    };

    move = () => {
        if (!Store.pause) {
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
        setTimeout(this.move, 10);
    };

    stay = () => {
        if (!Store.pause) {
            if (Store.travel || this.hit(this.position.x, this.position.y, this.props.damage)) {
                return this.setState({burst: true});
            }
        }
        setTimeout(this.stay, 10);
    };

    view = () => <BulletBubble w={this.D} color={cst[this.props.parent + 'BulletColor1']}/>;

    render() {
        let content;
        if (!this.state.burst) {
            content = this.view();
        } else {
            content = null;
        }

        return (<div
            className={'bullet-wrap'}
            ref={this.bullet}
            style={{left: `${this.position.x}px`, top: `${this.position.y}px`}}
        >
            {content}
        </div>);
    }
}

export default Bullet;