import {MASK} from '../Gradients/GradientDefs';
import BubbleCircle, {classNames} from './BubbleCircle';

/** Пузырь корпуса: мягкая заливка плюс подсветка по кромке. */
function Bubble({color, w, h, left = 0, top = 0, className}) {
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
                <BubbleCircle mask={MASK.edge}/>
            </svg>
        </div>
    );
}

export default Bubble;
