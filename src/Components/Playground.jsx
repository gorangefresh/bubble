import colors from '../config/colors';
import {FIELD_D} from '../config/world';
import session from '../game/session';
import BaseBubble from './Base/Bubbles/BaseBubble';
import Description from './Description';
import Field from './Field';

import './Playground.scss';

/**
 * Пузырь одного уровня.
 *
 * Было: компонент считал свою позицию внутри render(), попутно записывая
 * результат в this.position/this.top/this.left, сам мерил свой
 * getBoundingClientRect и держал слушатель resize, а при смене уровня ждал
 * 800 мс, подогнанных под CSS-переход. Теперь позиция приходит пропсами, а
 * центр поля считает Screen — он и так совпадает с центром экрана.
 */
function Playground({cellKey, position, left, top}) {
    const styles = {
        width: `${FIELD_D}px`,
        height: `${FIELD_D}px`,
        left,
        top
    };

    const hint = session.hintFor(cellKey);

    return (
        <div id={cellKey} className={'playground'} style={styles}>
            {hint ? <Description kind={hint}/> : null}
            <BaseBubble color={colors.color1} w={FIELD_D}/>
            {position === 'center' ? <Field cellKey={cellKey}/> : null}
        </div>
    );
}

export default Playground;
