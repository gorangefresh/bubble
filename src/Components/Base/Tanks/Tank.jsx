import React from 'react';
import MainBubble from '../Bubbles/MainBubble';
import BaseGun from '../Guns/BaseGun';
import Store from "../../Store";
import HighOpacity from "../Gradients/OpacityGradients/HighOpacity";


class Tank extends React.Component {
    speed = 20;
    width  = 50;
    mainColor = '#234ecd';

    type = 'hero';
    halfSpeed = this.speed * .66;
    pressed = {};
    position = {x: document.body.offsetWidth / 2, y: document.body.offsetHeight / 2};

    constructor(props) {
        super(props);

        this.tank = React.createRef();
        this.travelBubble = React.createRef();
        Store.mainTank.R = this.width / 2;
        Store.tankD = this.width;
    }

    addKey = e => this.pressed[e.code] = true;

    removeKey = e => delete this.pressed[e.code];

    componentDidMount() {
        document.addEventListener('keyup', this.removeKey);
        document.addEventListener('keydown', this.addKey);
        document.addEventListener('mousemove', this.mouseMove);
        this.move();
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.removeKey);
        document.removeEventListener('keydown', this.addKey);
        document.removeEventListener('mousemove', this.mouseMove);
        this.pressed = {};
    }

    travel = () => {
        const continueMoving = () => {
            this.tank.current.style.transition = '';
            this.move();
        };

        Store.travel = true;
        this.travelBubble.current.style.display = 'flex';
        let delta = Store.changeLevel();
        this.tank.current.style.transition = 'left .7s linear, top .7s linear';
        this.position.x += delta.x;
        this.position.y += delta.y;

        this.tank.current.style.left = `${this.position.x}px`;
        this.tank.current.style.top = `${this.position.y}px`;
        setTimeout(continueMoving, 600)
    };

    move = () => {
        this.goUp();
        this.goDown();
        this.goLeft();
        this.goRight();
        if (this.tank.current) {
            this.tank.current.style.left = `${this.position.x}px`;
            this.tank.current.style.top = `${this.position.y}px`;
            Store.setMainTank(this.tank.current.getBoundingClientRect());
            this.turn();
        }

        if (Store.touchEdge(this.position.x - Store.currentBasePosition.x, this.position.y - Store.currentBasePosition.y)) {
            if (!Store.travel) {
                return this.travel();
            }
        } else {
            if (Store.travel) {
                Store.travel = false;
                this.travelBubble.current.style.display = 'none';
            }
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

    mouseMove = e => {
        Store.setMouse(e);
        this.turn();
    };

    turn = () => {
        const getAngle = (center, point) => {
            return 180 * Math.atan2(point.y - center.y, point.x - center.x) / Math.PI + 90;
        };

        let angle = getAngle(Store.mainTank, Store.mouse);
        if (this.tank.current) this.tank.current.style.transform = `rotate(${angle}deg)`;
    };

    view = () => {
        return <>
            <BaseGun parent={this.type} position={{left: '0px', top: '0px'}}/>
        </>
    };

    render() {
        return (
            <div className={'tank-wrap'} ref={this.tank}>
                <div className={'bubble-wrap'} style={{display: 'none'}} ref={this.travelBubble}>
                    <svg id={'travel'} viewBox={'0 0 100 100'} style={{width: '100px', height: '100px'}}>
                        <HighOpacity color={'#fafafa'}/>
                    </svg>
                </div>
                <MainBubble w={this.width} color={this.mainColor}/>
                {this.view()}
            </div>
        );
    }

}

export default Tank;