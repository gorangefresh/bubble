import React from 'react';
import Bubble from '../Bubbles/Bubble';
import BaseGun from '../Guns/BaseGun';
import Store from "../../Store";
import HighOpacity from "../Gradients/OpacityGradients/HighOpacity";
import cst from "../../../const";

class Tank extends React.Component {
    speed = 20;
    width = 40;
    mainColor = '#234ecd';

    type = 'hero';
    halfSpeed = this.speed * .66;
    pressed = {};

    constructor(props) {
        super(props);

        this.tank = React.createRef();
        this.travelBubble = React.createRef();
        Store.mainTank.R = this.width / 2;
        Store.tankD = this.width;
        if (!Store.mainTank.x) this.setPosition();
    }

    setPosition = () => {
        Store.mainTank.x = document.body.offsetWidth / 2;
        Store.mainTank.y = document.body.offsetHeight / 2;
    };

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

        if (this.tank.current && this.travelBubble.current) {
            Store.travel = true;
            this.travelBubble.current.style.display = 'flex';
            let delta = Store.changeLevel();
            this.tank.current.style.transition = 'left .7s linear, top .7s linear';
            Store.mainTank.x += delta.x;
            Store.mainTank.y += delta.y;

            this.tank.current.style.left = `${Store.mainTank.x}px`;
            this.tank.current.style.top = `${Store.mainTank.y}px`;
            setTimeout(continueMoving, 600)
        }
    };

    move = () => {
        if (!Store.pause) {
            this.goUp();
            this.goDown();
            this.goLeft();
            this.goRight();
            if (this.tank.current) {
                this.tank.current.style.left = `${Store.mainTank.x}px`;
                this.tank.current.style.top = `${Store.mainTank.y}px`;
                this.turn();
            }

            if (Store.touchEdge(Store.mainTank.x - Store.currentBasePosition.x, Store.mainTank.y - Store.currentBasePosition.y)) {
                if (!Store.travel) {
                    return this.travel();
                }
            } else {
                if (Store.travel) {
                    Store.travel = false;
                    this.travelBubble.current.style.display = 'none';
                }
            }
        }
        if (this.tank.current) setTimeout(this.move, 50);
    };

    goUp = () => {
        if (this.pressed['KeyW'] && !this.pressed['KeyS']) {
            if (this.pressed['KeyA'] || this.pressed['KeyD']) {
                Store.mainTank.y = Store.mainTank.y - this.halfSpeed;
            } else {
                Store.mainTank.y = Store.mainTank.y - this.speed;
            }
        }
    };
    goDown = () => {
        if (this.pressed['KeyS'] && !this.pressed['KeyW']) {
            if (this.pressed['KeyA'] || this.pressed['KeyD']) {
                Store.mainTank.y = Store.mainTank.y + this.halfSpeed;
            } else {
                Store.mainTank.y = Store.mainTank.y + this.speed;
            }
        }

    };
    goLeft = () => {
        if (this.pressed['KeyA'] && !this.pressed['KeyD']) {
            if (this.pressed['KeyS'] || this.pressed['KeyW']) {
                Store.mainTank.x = Store.mainTank.x - this.halfSpeed;
            } else {
                Store.mainTank.x = Store.mainTank.x - this.speed;
            }
        }

    };
    goRight = () => {
        if (this.pressed['KeyD'] && !this.pressed['KeyA']) {
            if (this.pressed['KeyS'] || this.pressed['KeyW']) {
                Store.mainTank.x = Store.mainTank.x + this.halfSpeed;
            } else {
                Store.mainTank.x = Store.mainTank.x + this.speed;
            }
        }
    };

    mouseMove = e => {
        if (!Store.pause) {
            Store.setMouse(e);
            this.turn();
        }
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
            <Bubble left={-9} top={6} w={this.width / 3} color={this.mainColor}/>
            <Bubble left={9} top={6} w={this.width / 3} color={this.mainColor}/>
            <Bubble left={0} top={9} w={this.width / 3} color={this.mainColor}/>
            <Bubble left={0} top={-5} w={this.width / 2} color={this.mainColor}/>
            <BaseGun parent={this.type} position={{left: '0px', top: '-6px'}}/>
        </>
    };

    render() {
        return (
            <div className={'tank-wrap'} ref={this.tank}>
                <div className={'bubble-wrap'} style={{display: 'none'}} ref={this.travelBubble}>
                    <svg id={'travel'} viewBox={`0 0 ${this.width * 2} ${this.width * 2}`}
                         style={{width: `${this.width * 2}px`, height: `${this.width * 2}px`}}>
                        <HighOpacity color={cst.travelColor} w={this.width * 2}/>
                    </svg>
                </div>
                {this.view()}
            </div>
        );
    }

}

export default Tank;