import React, {useEffect, useRef} from 'react';
import GunBubble from '../Bubbles/GunBubble';
import Bullet from './Bullets/Bullet';
import Store from "../../Store";


function BaseGun(props) {
    const fireRate = 400;
    const gun = useRef(null);
    const damage = 1;
    let shooting = {mouseDown: false, fire: true};

    const startShooting = () => {
        shooting.mouseDown = true;
        if (shooting.fire) {
            shoot();
        }
    };

    const shoot = () => {
        shooting.fire = false;
        if (shooting.mouseDown) {
            let id = Store.getId('bullet', props.parent);
            Store.bullets[id] = <Bullet
                parent={props.parent}
                key={id}
                id={id}
                coordinates={gun.current.getBoundingClientRect()}
                tank={Store.mainTank}
                damage={damage}
                target={Store.mouse}
            />;
            Store.updateBulletPlace(id);

            setTimeout(allowFire, fireRate);
        }
    };

    const allowFire = () => {
        shooting.fire = true;
        if (shooting.mouseDown && gun.current) shoot();
    };

    const stopShooting = () => shooting.mouseDown = false;

    useEffect(() => {
        document.addEventListener('mousedown', startShooting);
        document.addEventListener('mouseup', stopShooting);
        return () => {
            document.removeEventListener('mousedown', startShooting);
            document.removeEventListener('mouseup', stopShooting);
        }
    }, []);

    return (
        <div className={'gun'} ref={gun} style={props.position}>
            <GunBubble w={20} left={0} top={2}/>
            <GunBubble w={12} left={0} top={-10}/>
        </div>
    );
}

export default BaseGun;