import React, {useEffect, useState} from 'react';
import Store from './Store';
import FirstEnemy from './Enemies/FirstEnemy';

let enemy = {
    'firstEnemy': FirstEnemy
};

function BulletsPlace() {
    const {x, y} = Store.currentLevel;
    const [bullet, setBullet] = useState();

    useEffect(() => {
        Store.setBullet = setBullet;
    });

    let bullets = [];

    for (let i in Store.bullets) {
        bullets.push(Store.bullets[i])
    }

    let enemies = [];
    let a = Store.matrix[x + '-' + y].enemies;
    for (let i in a) {
        enemies.push(React.createElement(
            enemy[a[i].type],
            {
                key: i,
                hp: a[i].hp
            }
        ))
    }

    return (
        <div style={{width: '100%', height: '100%', position: 'absolute'}}>
            {bullets}
            {enemies}
        </div>
    );
}

export default BulletsPlace;