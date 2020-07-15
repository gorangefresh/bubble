import React, {useEffect, useRef} from 'react';
import GunBubble from '../Bubbles/GunBubble';
import Bullet from './Bullets/Bullet';
import Store from "../../Store";


function BaseGun(props) {
    const gun = useRef(null);
    const damage = 1;
    let shooting = false;

    const startShooting = () => {
        shooting = true;
        shoot();
    };

    const stopShooting = () => shooting = false;

    useEffect(() => {
        document.addEventListener('mousedown', startShooting);
        document.addEventListener('mouseup', stopShooting);
        return () => {
            document.removeEventListener('mousedown', startShooting);
            document.removeEventListener('mouseup', stopShooting);
        }
    });

    useEffect(() => {
        return () => gun.current = null;
    });

    const shoot = () => {
        if (shooting) {
            let id = Store.getId('bullet', props.parent);
            Store.bullets[id] = <Bullet
                key={id} id={id}
                coordinates={gun.current.getBoundingClientRect()}
                damage={damage}
            />;

            Store.setBullet(id);
        }
        if (gun.current && shooting) setTimeout(shoot, 200);
    };

    return (
        <div className={'gun'} ref={gun} style={props.position}>
            <GunBubble w={20} left={0} top={2}/>
            <GunBubble w={12} left={0} top={-10}/>
        </div>
    );
}

export default BaseGun;