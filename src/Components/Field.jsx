import {useEffect, useState} from 'react';
import session from '../game/session';
import {bind, UI} from '../game/ui';
import EnemyView from './Enemies/EnemyView';

/**
 * Слой поля: снаряды и противники текущего уровня.
 *
 * Координаты сущностей внутри этого слоя отсчитываются от центра поля —
 * поэтому сам слой и стоит в left/top 50%. Было `BulletsPlace`, со
 * стилями прямо в разметке.
 */
function Field({cellKey}) {
    const [, setRevision] = useState(0);

    // Логика дёргает это, когда снаряд вылетел, попал или враг уничтожен.
    useEffect(() => bind(UI.FIELD, () => setRevision(n => n + 1)), []);

    const cell = session.matrix[cellKey];

    return (
        <div id={'place'} className={'field'}>
            {Object.values(session.bullets)}

            {Object.keys(cell.enemy).map(slot => (
                <EnemyView key={slot} slot={slot} record={cell.enemy[slot]}/>
            ))}
        </div>
    );
}

export default Field;
