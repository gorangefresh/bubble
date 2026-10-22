import React from 'react';
import colors from '../../../config/colors';
import {TRAVEL_MS} from '../../../config/world';
import World from '../../../engine/World';
import {clearBullets} from '../../../game/entities/bullet';
import {createTank, removeTank} from '../../../game/entities/tank';
import session from '../../../game/session';
import {bind, UI} from '../../../game/ui';
import BubbleCircle from '../Bubbles/BubbleCircle';
import {MASK} from '../Gradients/GradientDefs';
import tankArt from './tankArt';

/**
 * Танк игрока.
 *
 * Было: компонент сам держал слушатели клавиатуры и мыши, сам крутил
 * `setTimeout(this.move, 50)`, сам считал четыре метода goUp/goDown/
 * goLeft/goRight и писал style.left/top. Теперь движение — в сущности,
 * ввод — в общем модуле, а компонент остался видом плюс перелёт между
 * уровнями, который делается CSS-переходом.
 */
class Tank extends React.Component {
    node = React.createRef();
    travelBubble = React.createRef();

    state = {level: 0, ready: false};

    componentDidMount() {
        this.entity = createTank({onTravel: this.travel});
        this.entity.node = this.node.current;
        World.place(this.entity);

        this.unbind = bind(UI.UPGRADE, level => this.setState({level}));

        // Орудиям нужен носитель, поэтому вид рисуется вторым проходом.
        this.setState({ready: true});
    }

    componentWillUnmount() {
        this.unbind();
        removeTank();
        clearTimeout(this.travelTimer);
    }

    /**
     * Перелёт в соседний уровень.
     *
     * На время перелёта сущность замораживается: позицию ведёт CSS-переход,
     * и игровой цикл не должен перезаписывать transform.
     */
    travel = () => {
        const node = this.node.current;
        if (!node) return;

        session.travel = true;
        this.travelBubble.current.style.display = 'flex';

        clearBullets();

        const delta = session.changeLevel();
        const {entity} = this;

        entity.x += delta.x;
        entity.y += delta.y;
        entity.px = entity.x;
        entity.py = entity.y;
        entity.frozen = true;

        node.style.transition = `transform ${TRAVEL_MS}ms linear`;
        World.place(entity);

        this.travelTimer = setTimeout(this.arrive, TRAVEL_MS);
    };

    arrive = () => {
        const node = this.node.current;
        if (!node) return;

        node.style.transition = '';
        this.entity.frozen = false;
        session.travel = false;
        this.travelBubble.current.style.display = 'none';
    };

    render() {
        const size = session.hero.stats.width * 2;

        return (
            <div className={'tank-wrap'} ref={this.node}>
                <div className={'bubble-wrap'} style={{display: 'none'}} ref={this.travelBubble}>
                    <svg
                        viewBox={`0 0 ${size} ${size}`}
                        style={{width: `${size}px`, height: `${size}px`, fill: colors.travelColor}}
                    >
                        <BubbleCircle mask={MASK.high}/>
                    </svg>
                </div>

                {this.state.ready ? tankArt[session.heroTankId](this.entity) : null}
            </div>
        );
    }
}

export default Tank;
