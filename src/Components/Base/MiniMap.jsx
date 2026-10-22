import colors from '../../config/colors';
import {MATRIX_SIDE} from '../../config/levels';
import session from '../../game/session';
import MapBubble from './Bubbles/MapBubble';

import './MiniMap.scss';

const WIDTH = 300;
const PADDING = 5;

/** Миникарта: текущая ячейка выделена, зачищенные нарисованы плотнее. */
function MiniMap({current}) {
    const bubbleWidth = (WIDTH - PADDING * 2) / MATRIX_SIDE;
    const styles = {width: `${WIDTH}px`, height: `${WIDTH}px`, padding: `${PADDING}px`};

    return (
        <div className={'mini-map'} style={styles}>
            {Object.keys(session.matrix).map(key => (
                <MapBubble
                    key={key}
                    // Было: оба цвета захардкожены прямо в этом файле.
                    color={key === current ? colors.mapCurrent : colors.mapBase}
                    w={bubbleWidth}
                    empty={session.matrix[key].empty && key !== current}
                />
            ))}
        </div>
    );
}

export default MiniMap;
