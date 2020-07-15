import React, {useRef, useEffect} from 'react';
import MainBubble from '../Bubbles/MainBubble';
import BaseGun from '../Guns/BaseGun';
import Store from "../../Store";


function FirstTank() {
    const type = 'hero';
    const tank = useRef();
    const speed = 20;
    const halfSpeed = 12;
    let pressed = {};
    const position = {x: document.body.offsetWidth / 2, y: document.body.offsetHeight / 2};


    const move = () => {
        goUp();
        goDown();
        goLeft();
        goRight();
        tank.current.style.left = `${position.x}px`;
        tank.current.style.top = `${position.y}px`;
        Store.setMainTank(tank.current.getBoundingClientRect());
        turn();
        if (tank.current) setTimeout(move, 50);
    };

    const goUp = () => {
        if (pressed['KeyW'] && !pressed['KeyS']) {
            if (pressed['KeyA'] || pressed['KeyD']) {
                position.y = position.y - halfSpeed;
            } else {
                position.y = position.y - speed;
            }
        }
    };
    const goDown = () => {
        if (pressed['KeyS'] && !pressed['KeyW']) {
            if (pressed['KeyA'] || pressed['KeyD']) {
                position.y = position.y + halfSpeed;
            } else {
                position.y = position.y + speed;
            }
        }

    };
    const goLeft = () => {
        if (pressed['KeyA'] && !pressed['KeyD']) {
            if (pressed['KeyS'] || pressed['KeyW']) {
                position.x = position.x - halfSpeed;
            } else {
                position.x = position.x - speed;
            }
        }

    };
    const goRight = () => {
        if (pressed['KeyD'] && !pressed['KeyA']) {
            if (pressed['KeyS'] || pressed['KeyW']) {
                position.x = position.x + halfSpeed;
            } else {
                position.x = position.x + speed;
            }
        }
    };

    useEffect(() => {
        move();
        return () => tank.current = null;
    });

    const addKey = e => pressed[e.code] = true;

    const removeKey = e => delete pressed[e.code];

    useEffect(() => {
        document.addEventListener('keyup', removeKey);
        document.addEventListener('keydown', addKey);
        return () => {
            document.removeEventListener('keyup', removeKey);
            document.removeEventListener('keydown', addKey);
        };
    });

    const mouseMove = e => {
        Store.setMouse(e);
        turn();
    };

    const turn = () => {
        let angle = getAngle(Store.mainTank, Store.mouse);
        tank.current.style.transform = `rotate(${angle}deg)`;
    };

    const getAngle = (center, point) => {
        return 180*Math.atan2(point.y-center.y, point.x-center.x)/Math.PI + 90;
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMove);
        return () => {
            document.removeEventListener('mousemove', mouseMove);
        }
    });

    return (
        <div className={'tank-wrap'} ref={tank}>
            <MainBubble w={50}/>
            <BaseGun parent={type} position={{left: '10px', top: '0px'}}/>
            <BaseGun parent={type} position={{left: '-10px', top: '0px'}}/>
            <BaseGun parent={type} position={{left: '-35px', top: '10px'}}/>
            <BaseGun parent={type} position={{left: '35px', top: '10px'}}/>
        </div>
    );
}

export default FirstTank;