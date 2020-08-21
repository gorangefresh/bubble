import React from 'react';
import MainBubble from '../Base/Bubbles/MainBubble';
import Store from "../Store";
import Gun from "../Base/Guns/Gun";


/** Универсальный класс компонента противника
 *
 * БАЗОВЫЕ НАСТРОЙКИ
 * baseSpeed = 2; // (px / 10ms) // 10ms - период обновления позиции
 * width = 40; // px
 * trajectoryChangeRate = 5000; // ms
 *
 * Внешний вид задается в функции view;
 * Компоненту оружия необходимо передать в пропсы tank={this.tank}
 */

class Enemy extends React.Component {
    baseSpeed = 2;
    width = 40;
    trajectoryChangeRate = 5000;

    type = 'enemy';
    speed = {x: 0, y: 0};
    R = this.width / 2;
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
                this.turn();
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
        if (!touchEdge && !this.state.burst) setTimeout(this.getSpeed, Math.random() * this.trajectoryChangeRate)
    };

    turn = () => {
        const getAngle = (center, point) => {
            return 180 * Math.atan2(point.y - center.y, point.x - center.x) / Math.PI + 90;
        };

        if (this.tank.current) {
            let angle = getAngle(this.tank.current.getBoundingClientRect(), Store.mainTank);
            this.tank.current.style.transform = `rotate(${angle}deg)`;
        }
    };

    view = () => {
        return <>
            <MainBubble w={this.width} color={'#95f7ff'}/>
            <Gun
                parent={this.type}
                position={{left: '0px', top: '0px'}}
                tank={this.tank}
            />
        </>
    };

    render() {
        if (!this.state.burst) {
            let style = {left: `${this.position.x}px`, top: `${this.position.y}px`};
            return (
                <div className={'enemy-wrap'} ref={this.tank} style={style}>
                    {this.view()}
                </div>
            );
        } else {
            return null;
        }
    }

}

export default Enemy;