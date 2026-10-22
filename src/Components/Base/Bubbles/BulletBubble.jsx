import {MASK} from '../Gradients/GradientDefs';
import BubbleCircle, {classNames} from './BubbleCircle';

/**
 * Пузырь снаряда.
 *
 * Было: className подставлялся без проверки, и у всех снарядов, которым его
 * не передавали, в разметке оказывался class="bubble-wrap undefined".
 */
function BulletBubble({w, h, color, left = 0, top = 0, className}) {
    const height = h || w;

    return (
        <div
            className={classNames('bubble-wrap', className)}
            style={{left: `${left}px`, top: `${top}px`}}
        >
            <svg
                viewBox={`0 0 ${w} ${height}`}
                style={{width: `${w}px`, height: `${height}px`, fill: color}}
            >
                <BubbleCircle mask={MASK.low}/>
            </svg>
        </div>
    );
}

export default BulletBubble;
