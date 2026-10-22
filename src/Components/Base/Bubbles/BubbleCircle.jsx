/**
 * Круг под одной из общих масок. Цвет приходит через `fill` на родительском
 * svg, поэтому сама маска от цвета не зависит.
 */
function BubbleCircle({mask, className}) {
    return (
        <circle
            className={className}
            r={'50%'}
            cx={'50%'}
            cy={'50%'}
            mask={`url(#${mask})`}
        />
    );
}

/** Склейка классов без «undefined» в атрибуте. */
export const classNames = (...names) => names.filter(Boolean).join(' ');

export default BubbleCircle;
