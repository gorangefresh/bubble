import React, {useEffect, useState} from 'react';
import Store from './Store';


function BulletsPlace() {
    const [bullet, setBullet] = useState();

    useEffect(() => {
        Store.setBullet = setBullet;
    });

    let content = [];

    for (let i in Store.bullets) {
        content.push(Store.bullets[i])
    }

    return (
        <div style={{width: '100%', height: '100%', position: 'absolute'}}>
            {content}
        </div>
    );
}

export default BulletsPlace;