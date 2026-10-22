import React from 'react';
import World from '../../../engine/World';
import {createGun} from '../../../game/entities/gun';
import {renderBullet} from '../Bullets/BulletView';
import gunArt from './gunArt';

/**
 * Представление орудия.
 *
 * Было: восемь классов-наследников, и каждый вешал на document собственные
 * mousedown/mouseup. У Destroyer четыре ракетницы — четыре пары слушателей
 * на один клик. Теперь ввод читает один модуль, а перезарядка тикает в общем
 * игровом цикле.
 *
 * @param type   ключ в config/guns
 * @param owner  сущность-носитель
 * @param parent 'hero' | 'enemy'
 * @param offset смещение в системе координат корпуса
 * @param angle  разворот орудия относительно корпуса
 * @param damage переопределение урона
 */
class GunView extends React.Component {
    componentDidMount() {
        const {type, owner, parent, offset, angle, damage} = this.props;

        this.entity = createGun({
            type,
            owner,
            parent,
            offset,
            angle,
            damage,
            renderBullet
        });
    }

    componentWillUnmount() {
        World.remove(this.entity);
    }

    render() {
        const {type, offset, angle} = this.props;

        const style = {left: `${offset.x}px`, top: `${offset.y}px`};
        if (angle) style.transform = `rotate(${angle}deg)`;

        return (
            <div className={'gun'} style={style}>
                {gunArt[type]()}
            </div>
        );
    }
}

export default GunView;
