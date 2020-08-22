import React from 'react';
import BulletBubble from "../Bubbles/BulletBubble";
import Store from "../../Store";

class Bullet extends React.Component {
    baseSpeed = 6;
    D = 10;

    bullet = React.createRef();
    position = {
        x: this.props.coordinates.x - Store.currentBasePosition.x,
        y: this.props.coordinates.y - Store.currentBasePosition.y
    };
    speed = {x: 0, y: 0};
    hit = this.props.parent === 'hero' ? Store.hit : Store.enemyHit;

    constructor(props) {
        super(props);

        this.state = {burst: false};
    }

    componentDidMount() {
        this.getSpeed();
        this.baseSpeed !== 0 ? this.move() : this.stay();
    }

    componentDidUpdate() {
        if (this.state.burst) delete Store.bullets[this.props.id];
    }

    getSpeed = () => {
        const {tank, target} = this.props;

        let a = target.x - tank.x;
        let b = target.y - tank.y;
        let R = Math.sqrt(a ** 2 + b ** 2);
        this.speed.x = a * this.baseSpeed / R;
        this.speed.y = b * this.baseSpeed / R;
    };

    move = () => {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (!this.state.burst && this.bullet.current) {
            this.bullet.current.style.left = `${this.position.x}px`;
            this.bullet.current.style.top = `${this.position.y}px`;
        }

        if (
            !Store.travel &&
            !Store.touchEdge(this.position.x, this.position.y) &&
            !this.hit(this.position.x, this.position.y, this.props.damage)
        ) {
            setTimeout(this.move, 10);
        } else {
            this.setState({burst: true});
        }
    };

    stay = () => {
        if (!Store.travel && !this.hit(this.position.x, this.position.y, this.props.damage)) {
            setTimeout(this.stay, 10);
        } else {
            this.setState({burst: true});
        }
    };

    view = () => <BulletBubble w={this.D}/>;

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