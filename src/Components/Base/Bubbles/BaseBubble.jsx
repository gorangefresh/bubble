import {MASK} from '../Gradients/GradientDefs';
import BubbleCircle from './BubbleCircle';

/** Пузырь игрового поля — крупный, с плотной кромкой. */
function BaseBubble({w, h, color}) {
    const height = h || w;

    return (
        <div className={'base-bubble-wrap'}>
            <svg
                viewBox={`0 0 ${w} ${height}`}
                style={{width: `${w}px`, height: `${height}px`, fill: color}}
            >
                <BubbleCircle mask={MASK.high}/>
            </svg>
        </div>
    );
}

export default BaseBubble;
