import React, {useEffect, useRef} from 'react';
import GunBubble from '../Bubbles/GunBubble';
import Bullet from './Bullets/Bullet';
import Store from "../../Store";


function Gun(props) {
    const fireRate = 1500;
    const gun = useRef(null);
    const damage = 1;

    const shoot = () => {
        if (gun.current) {
            let id = Store.getId('bullet', props.parent);
            let pos = gun.current.getBoundingClientRect();
            Store.bullets[id] = <Bullet
                parent={props.parent}
                key={id}
                id={id}
                coordinates={pos}
                tank={pos}
                damage={damage}
                target={Store.mainTank}
            />;
            Store.setBullet(id);
        }
        setTimeout(shoot, fireRate);
    };

    useEffect(() => {
        setTimeout(shoot, fireRate * Math.random());
    }, []);

    return (
        <div className={'gun'} ref={gun} style={props.position}>
            <GunBubble w={20} left={0} top={2}/>
            <GunBubble w={12} left={0} top={-10}/>
        </div>
    );
}

export default Gun;