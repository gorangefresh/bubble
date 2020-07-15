import React, {useRef, useEffect, useState} from 'react';
import BulletBubble from "../../Bubbles/BulletBubble";
import Store from "../../../Store";

const type = 'bullet';

function Bullet(props) {
    const {id, coordinates, damage} = props;
    const bullet = useRef();
    const position = coordinates;
    const baseSpeed = 30;
    const D = 10;
    const [burst, letBurst] = useState(false);
    const speed = {x: 0, y: 0};

    useEffect(() => {
        Store.checkIn(type, id, coordinates, damage);
        getSpeed();
        move();
        return () => {
            Store.checkOut('bullet', id);
        };
    });

    const getSpeed = () => {
        let a = Store.mouse.x - position.x;
        let b = Store.mouse.y - position.y;
        let R = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        let t = R / baseSpeed;
        speed.x = a / t;
        speed.y = b / t;
    };

    useEffect(() => {
        if (burst) delete Store.bullets[id];
    }, [burst]);

    const move = () => {
        position.x += speed.x;
        position.y += speed.y;
        if (!burst) {
            bullet.current.style.left = `${position.x}px`;
            bullet.current.style.top = `${position.y}px`;
            Store.setBulletPosition(id, position);
        }

        if (!touchEdge()) {
            setTimeout(move, 50);
        } else {
            letBurst(true);
        }

    };

    const touchEdge = () => {
        let a = position.x - Store.currentBaseCords.x;
        let b = position.y - Store.currentBaseCords.y;
        let R = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return R >= Store.baseD / 2;
    };

    let content;
    if (!burst) {
        content = <BulletBubble w={D}/>
    } else {
        content = <div></div>
    }

    return (<div className={'bullet-wrap'} ref={bullet}>
        {content}
    </div>);


}

export default Bullet;