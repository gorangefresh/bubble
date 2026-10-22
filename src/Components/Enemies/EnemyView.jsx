import React from 'react';
import World from '../../engine/World';
import {createEnemy} from '../../game/entities/enemy';
import session from '../../game/session';
import {emit, UI} from '../../game/ui';
import enemyArt from './enemyArt';

/**
 * Представление противника.
 *
 * Было шесть классов (Enemy и пять наследников), каждый со своей цепочкой
 * setTimeout и вызовом getBoundingClientRect на каждом тике. Орудия
 * монтируются только после того, как сущность создана: им нужен носитель.
 */
class EnemyView extends React.Component {
    node = React.createRef();
    state = {ready: false};

    componentDidMount() {
        this.entity = createEnemy({
            slot: this.props.slot,
            record: this.props.record,
            onRemove: this.handleRemove
        });

        this.entity.node = this.node.current;
        World.place(this.entity);

        this.setState({ready: true});
    }

    componentWillUnmount() {
        // Раньше размонтирование не останавливало ничего: цепочка
        // getSpeed продолжала планировать себя после смены уровня.
        World.remove(this.entity);
    }

    handleRemove = entity => {
        session.unregisterEnemy(entity.slot);
        emit(UI.FIELD, entity.slot);
    };

    render() {
        const {record} = this.props;

        return (
            <div className={'enemy-wrap'} ref={this.node}>
                {this.state.ready ? enemyArt[record.type](this.entity) : null}
            </div>
        );
    }
}

export default EnemyView;
