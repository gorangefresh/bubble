import colors from '../../../config/colors';
import BulletBubble from '../Bubbles/BulletBubble';

/**
 * Внешний вид снарядов по типу из config/bullets.
 *
 * Было по классу на каждый вид: Bullet, BigBullet, BulletHunter, Mine.
 * При этом BulletHunter переопределял move/getSpeed/targetSelection почти
 * дословной копией из Bullet, а Mine заводил setTimeout внутри своего
 * view(). Поведение теперь целиком в данных (homing, lifeTime), здесь —
 * только картинка.
 */
const bulletArt = {
    bullet: ({d, parent}) => (
        <BulletBubble w={d} color={colors[`${parent}BulletColor1`]}/>
    ),

    bigBullet: ({d, parent}) => (
        <BulletBubble w={d} color={colors[`${parent}BulletColor2`]}/>
    ),

    hunter: ({d}) => (
        <>
            <BulletBubble w={d} color={colors.rocketColor} top={2} left={0}/>
            <BulletBubble w={d / 1.2} color={colors.rocketColor} top={-4} left={0}/>
            <BulletBubble w={d / 2} color={colors.rocketColor} top={6} left={4}/>
            <BulletBubble w={d / 2} color={colors.rocketColor} top={6} left={-4}/>
        </>
    ),

    mine: ({d, parent}) => {
        const color = colors[`${parent}BulletColor3`];
        // Мигает только мина противника — чтобы её было видно.
        const className = parent === 'hero' ? null : 'mine-bubble';

        return (
            <>
                <BulletBubble w={d} color={color} className={className}/>
                <BulletBubble w={5} top={-8} left={-6} color={color} className={className}/>
                <BulletBubble w={5} top={0} left={-6} color={color} className={className}/>
                <BulletBubble w={5} top={-8} left={6} color={color} className={className}/>
                <BulletBubble w={5} top={0} left={6} color={color} className={className}/>
                <BulletBubble w={5} top={-11} left={0} color={color} className={className}/>
                <BulletBubble w={5} top={2} left={0} color={color} className={className}/>
            </>
        );
    }
};

export default bulletArt;
