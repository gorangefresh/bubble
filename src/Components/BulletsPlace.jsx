import React, {useEffect, useState} from 'react';
import Store from './Store';
import FirstEnemy from './Enemies/FirstEnemy';
import SecondEnemy from './Enemies/SecondEnemy';

let enemy = {
    'firstEnemy': FirstEnemy,
    'secondEnemy': SecondEnemy,
};

function BulletsPlace() {
    const {x, y} = Store;
    const [bullet, setBullet] = useState('');

    useEffect(() => {
        Store.updateBulletPlace = setBullet;
    });

    let bullets = [];

    for (let i in Store.bullets) {
        bullets.push(Store.bullets[i])
    }

    let enemies = [];
    let a = Store.matrix[x + '-' + y].enemy;
    for (let i in a) {
        enemies.push(React.createElement(
            enemy[a[i].type],
            {
                key: i,
                enemyId: i
            }
        ))
    }

    return (
        <div
            id={'place'}
            style={{
                width: '100%', height: '100%', position: 'absolute',
                left: '50%', top: '50%'
            }}>
            {bullets}
            {enemies}
        </div>
    );
}

export default BulletsPlace;