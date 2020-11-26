import React from 'react';
import Store from "../../Store";
import HighOpacity from "../Gradients/OpacityGradients/HighOpacity";
import cst from "../../../const";
import Light1 from "./Light1";
import Light2 from "./Light2";
import Light3 from "./Light3";
import Balanced1 from "./Balanced1";
import Balanced2 from "./Balanced2";
import Balanced3 from "./Balanced3";
import Heavy1 from "./Heavy1";
import Heavy2 from "./Heavy2";
import Heavy3 from "./Heavy3";
import Destroyer from "./Destroyer";
import BaseTank from "./BaseTank";


const Tanks = {
    0: {light: BaseTank},
    1: {light: Light1, heavy: Heavy1, balanced: Balanced1},
    2: {light: Light2, heavy: Heavy2, balanced: Balanced2},
    3: {light: Light3, heavy: Heavy3, balanced: Balanced3},
    4: {light: Destroyer, heavy: Destroyer, balanced: Destroyer},
};

class Tank extends React.Component {
    pressed = {};

    constructor(props) {
        super(props);

        this.tank = React.createRef();
        this.travelBubble = React.createRef();

        this.state = { lvl: 0 };
        Store.upgrade = (lvl) => this.setState({lvl});

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
                Store.mainTank.y = Store.mainTank.y - Store.mainTank.halfSpeed;
            } else {
                Store.mainTank.y = Store.mainTank.y - Store.mainTank.speed;
            }
        }
    };
    goDown = () => {
        if (this.pressed['KeyS'] && !this.pressed['KeyW']) {
            if (this.pressed['KeyA'] || this.pressed['KeyD']) {
                Store.mainTank.y = Store.mainTank.y + Store.mainTank.halfSpeed;
            } else {
                Store.mainTank.y = Store.mainTank.y + Store.mainTank.speed;
            }
        }

    };
    goLeft = () => {
        if (this.pressed['KeyA'] && !this.pressed['KeyD']) {
            if (this.pressed['KeyS'] || this.pressed['KeyW']) {
                Store.mainTank.x = Store.mainTank.x - Store.mainTank.halfSpeed;
            } else {
                Store.mainTank.x = Store.mainTank.x - Store.mainTank.speed;
            }
        }

    };
    goRight = () => {
        if (this.pressed['KeyD'] && !this.pressed['KeyA']) {
            if (this.pressed['KeyS'] || this.pressed['KeyW']) {
                Store.mainTank.x = Store.mainTank.x + Store.mainTank.halfSpeed;
            } else {
                Store.mainTank.x = Store.mainTank.x + Store.mainTank.speed;
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
            return 180 * Math.atan2(point.y - center.y, point.x - center.x) / Math.PI;
        };

        Store.mainTank.angle = getAngle(Store.mainTank, Store.mouse);
        if (this.tank.current) this.tank.current.style.transform = `rotate(${Store.mainTank.angle + 90}deg)`;
    };

    render() {
        let view = React.createElement(
            Tanks[this.state.lvl][Store.upgradeTree[this.state.lvl]],
            {
                tank: this.tank,
            }
        );

        return (
            <div className={'tank-wrap'} ref={this.tank}>
                <div className={'bubble-wrap'} style={{display: 'none'}} ref={this.travelBubble}>
                    <svg id={'travel'} viewBox={`0 0 ${Store.tankD * 2} ${Store.tankD * 2}`}
                         style={{width: `${Store.tankD * 2}px`, height: `${Store.tankD * 2}px`}}>
                        <HighOpacity color={cst.travelColor} w={Store.tankD * 2}/>
                    </svg>
                </div>
                {view}
            </div>
        );
    }

}

export default Tank;