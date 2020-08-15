import React from 'react';
import MainBubble from '../Base/Bubbles/MainBubble';
import Store from "../Store";


class FirstEnemy extends React.Component {
    type = 'enemy';
    baseSpeed = 1;
    speed = {x: 0, y: 0};
    width = 40;
    R = 20;
    position = {};

    constructor(props) {
        super(props);

        this.state = {burst: false};

        this.tank = React.createRef();
        this.id = Store.getId(this.type);
        this.position = this.getRandomPosition();
    }

    getRandomPosition() {
        let R = Store.baseR - this.width;
        let x = Math.random() * R * this.randomSign();
        let y = Math.random() * Math.sqrt(R ** 2 - x ** 2) * this.randomSign();
        Store.checkIn(this.type, this.props.enemyId, {x, y, R: this.R}, this.burst);
        return {x, y};
    }

    randomSign = () => Math.random() > 0.5 ? 1 : -1;

    componentDidMount() {
        this.getSpeed();
        this.move();
    }

    burst = () => {
        Store.checkOut(this.type, this.props.enemyId);
        this.setState({burst: true});
    };

    move = () => {
        if (!this.state.burst) {
            this.position.x += this.speed.x;
            this.position.y += this.speed.y;
            if (this.tank.current) {
                this.tank.current.style.left = `${this.position.x}px`;
                this.tank.current.style.top = `${this.position.y}px`;
                Store.current[this.type][this.props.enemyId].coordinates = {x: this.position.x, y: this.position.y};
                // this.turn();
            }

            if (Store.touchEdge(this.position.x, this.position.y, this.R)) {
                this.getSpeed(true);
            }

            if (this.tank.current) setTimeout(this.move, 10);
        }
    };

    getSpeed = (touchEdge) => {
        let x = Math.random() * Store.baseR * this.randomSign();
        let y = Math.random() * Store.baseR * this.randomSign();
        let a = x - this.position.x;
        let b = y - this.position.y;
        let R = Math.sqrt(a**2 + b**2);
        let t = R / this.baseSpeed;
        this.speed.x = a / t;
        this.speed.y = b / t;
        if (!touchEdge && !this.state.burst) setTimeout(this.getSpeed, Math.random() * 5000)
    };

    turn = () => {
        const getAngle = (center, point) => {
            return 180 * Math.atan2(point.y - center.y, point.x - center.x) / Math.PI + 90;
        };

        let angle = getAngle(Store.mainTank, Store.mouse);
        if (this.tank.current) this.tank.current.style.transform = `rotate(${angle}deg)`;
    };

    render() {
        if (!this.state.burst) {
            let style = {left: `${this.position.x}px`, top: `${this.position.y}px`};
            return (
                <div className={'enemy-wrap'} ref={this.tank} style={style}>
                    <MainBubble w={this.width} color={'#95f7ff'}/>
                </div>
            );
        } else {
            return null;
        }
    }

}

export default FirstEnemy;