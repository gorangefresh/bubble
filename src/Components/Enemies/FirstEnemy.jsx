import React from 'react';
import MainBubble from '../Base/Bubbles/MainBubble';
import Store from "../Store";


class FirstEnemy extends React.Component {
    type = 'enemy';
    speed = 15;
    halfSpeed = this.speed * .66;
    width = 40;
    R = 20;
    pressed = {};
    position = {};

    constructor(props) {
        super(props);

        this.state = {burst: false};

        this.tank = React.createRef();
        this.id = Store.getId(this.type);
        this.position = this.getRandomPosition();

    }

    getRandomPosition() {
        let R = Store.baseD / 2 - this.width;
        let x = Math.random() * R * (Math.random() > 0.5 ? 1 : -1);
        let y = Math.random() * Math.sqrt(R ** 2 - x ** 2) * (Math.random() > 0.5 ? 1 : -1);
        Store.checkIn(this.type, this.props.enemyId, {x, y, R: this.R}, this.burst);
        return {x, y}
    }

    // componentDidMount() {
    //     this.move();
    // }
    //
    // componentWillUnmount() {
    //     this.pressed = {};
    // }

    burst = () => {
        Store.checkOut(this.type, this.props.enemyId);
        this.setState({burst: true});
    };

    move = () => {
        this.goUp();
        this.goDown();
        this.goLeft();
        this.goRight();
        if (this.tank.current) {
            this.tank.current.style.left = `${this.position.x}px`;
            this.tank.current.style.top = `${this.position.y}px`;
            Store[this.type][this.id].coordinates = {x: this.position.x, y: this.position.y};
            // this.turn();
        }

        if (Store.touchEdge(this.position.x, this.position.y)) {
            // выбор направления если дошли до края
        }

        if (this.tank.current) setTimeout(this.move, 50);
    };

    goUp = () => {
        if (this.pressed['KeyW'] && !this.pressed['KeyS']) {
            if (this.pressed['KeyA'] || this.pressed['KeyD']) {
                this.position.y = this.position.y - this.halfSpeed;
            } else {
                this.position.y = this.position.y - this.speed;
            }
        }
    };
    goDown = () => {
        if (this.pressed['KeyS'] && !this.pressed['KeyW']) {
            if (this.pressed['KeyA'] || this.pressed['KeyD']) {
                this.position.y = this.position.y + this.halfSpeed;
            } else {
                this.position.y = this.position.y + this.speed;
            }
        }

    };
    goLeft = () => {
        if (this.pressed['KeyA'] && !this.pressed['KeyD']) {
            if (this.pressed['KeyS'] || this.pressed['KeyW']) {
                this.position.x = this.position.x - this.halfSpeed;
            } else {
                this.position.x = this.position.x - this.speed;
            }
        }

    };
    goRight = () => {
        if (this.pressed['KeyD'] && !this.pressed['KeyA']) {
            if (this.pressed['KeyS'] || this.pressed['KeyW']) {
                this.position.x = this.position.x + this.halfSpeed;
            } else {
                this.position.x = this.position.x + this.speed;
            }
        }
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
                <div className={'tank-wrap'} ref={this.tank} style={style}>
                    <MainBubble w={this.width} color={'#95f7ff'}/>
                </div>
            );
        } else {
            return null;
        }
    }

}

export default FirstEnemy;