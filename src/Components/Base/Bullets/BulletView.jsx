import React from 'react';
import World from '../../../engine/World';
import bulletArt from './bulletArt';

import './Bullets.scss';

/**
 * Представление снаряда. Вся физика — в сущности, компонент только
 * отдаёт узел движку и снимает сущность при размонтировании.
 */
class BulletView extends React.Component {
    node = React.createRef();

    componentDidMount() {
        const {entity} = this.props;

        entity.node = this.node.current;
        World.place(entity);
    }

    /**
     * Было: у снаряда не было размонтирования вовсе. Цепочка
     * `setTimeout(this.move, 30)` продолжала крутиться и после того, как
     * React убрал компонент — каждая смена уровня оставляла по такой
     * цепочке на каждый снаряд в полёте.
     */
    componentWillUnmount() {
        World.remove(this.props.entity);
    }

    render() {
        const {entity} = this.props;

        return (
            <div
                className={'bullet-wrap'}
                ref={this.node}
                style={{
                    transform:
                        `translate3d(${entity.x}px, ${entity.y}px, 0) rotate(${entity.angle}deg)`
                }}
            >
                {bulletArt[entity.type](entity)}
            </div>
        );
    }
}

/** Фабрика элемента — её получает орудие при выстреле. */
export const renderBullet = entity => <BulletView key={entity.id} entity={entity}/>;

export default BulletView;
