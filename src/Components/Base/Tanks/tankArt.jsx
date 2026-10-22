import colors from '../../../config/colors';
import tanks from '../../../config/tanks';
import Bubble from '../Bubbles/Bubble';
import GunView from '../Guns/GunView';

/**
 * Внешний вид корпусов по id из config/tanks.
 *
 * Было одиннадцать файлов-наследников TankView, каждый — с восемью
 * строками импортов, полями speed/width и конструктором базового класса,
 * который писал эти значения прямо в глобальный Store.mainTank.
 */

/** Пузырь корпуса: цвет у всех один. */
const hull = (left, top, w) => (
    <Bubble key={`${left}:${top}:${w}`} left={left} top={top} w={w} color={colors.heroColor2}/>
);

/** Тёмный пузырь — гусеницы и обвес. */
const trim = (left, top, w) => (
    <Bubble key={`t${left}:${top}:${w}`} left={left} top={top} w={w} color={colors.color5}/>
);

const gun = (type, owner, offset, extra) => (
    <GunView
        key={`${type}:${offset.x}:${offset.y}`}
        type={type}
        parent={'hero'}
        owner={owner}
        offset={offset}
        {...extra}
    />
);

const W = id => tanks[id].width;

const tankArt = {
    base: owner => (
        <>
            {hull(-9, 6, W('base') / 3)}
            {hull(9, 6, W('base') / 3)}
            {hull(0, 9, W('base') / 3)}
            {hull(0, -5, W('base') / 2)}
            {gun('baseGun', owner, {x: 0, y: -6})}
        </>
    ),

    light1: owner => (
        <>
            {hull(12, 7, W('light1') / 1.5)}
            {hull(-12, 7, W('light1') / 1.5)}
            {hull(0, -12, W('light1') / 1.5)}
            {trim(-12, 15, 10)}
            {trim(12, 15, 10)}
            {gun('machineGun', owner, {x: 0, y: 0})}
        </>
    ),

    light2: owner => (
        <>
            {hull(12, 7, W('light2') / 1.5)}
            {hull(-12, 7, W('light2') / 1.5)}
            {hull(0, -12, W('light2') / 1.5)}
            {gun('machineGun', owner, {x: 10, y: 0})}
            {gun('machineGun', owner, {x: -10, y: 0})}
        </>
    ),

    light3: owner => (
        <>
            {hull(12, 7, 25)}
            {hull(-12, 7, 25)}
            {hull(0, -12, 25)}
            {trim(24, 9, 10)}
            {trim(-24, 9, 10)}
            {trim(-22, 15, 10)}
            {trim(22, 15, 10)}
            {trim(-12, 15, 10)}
            {trim(12, 15, 10)}
            {gun('heavyMachineGun', owner, {x: 0, y: -10})}
        </>
    ),

    balanced1: owner => (
        <>
            {hull(14, -8, W('balanced1') / 1.8)}
            {hull(-14, -8, W('balanced1') / 1.8)}
            {hull(8, 5, W('balanced1') / 2.2)}
            {hull(-8, 5, W('balanced1') / 2.2)}
            {hull(0, 10, W('balanced1') / 4)}
            {gun('baseGun', owner, {x: 14, y: -10})}
            {gun('baseGun', owner, {x: -14, y: -10})}
        </>
    ),

    balanced2: owner => (
        <>
            {hull(15, -12, W('balanced2') / 3)}
            {hull(-15, -12, W('balanced2') / 3)}
            {hull(20, 0, W('balanced2') / 3)}
            {hull(-20, 0, W('balanced2') / 3)}
            {hull(13, 11, W('balanced2') / 3)}
            {hull(-13, 11, W('balanced2') / 3)}
            {hull(0, 20, W('balanced2') / 2)}
            {gun('rocketLauncher', owner, {x: 0, y: 5})}
        </>
    ),

    balanced3: owner => (
        <>
            {hull(22, -8, W('balanced3') / 3)}
            {hull(-22, -8, W('balanced3') / 3)}
            {hull(17, 2, W('balanced3') / 3)}
            {hull(-17, 2, W('balanced3') / 3)}
            {hull(0, -12, W('balanced3') / 3)}
            {hull(5, 2, W('balanced3') / 3)}
            {hull(-5, 2, W('balanced3') / 3)}
            {hull(10, 11, W('balanced3') / 3)}
            {hull(-10, 11, W('balanced3') / 3)}
            {hull(0, 18, W('balanced3') / 2)}
            {gun('rocketLauncher', owner, {x: 10, y: -5})}
            {gun('rocketLauncher', owner, {x: -10, y: -5})}
        </>
    ),

    heavy1: owner => (
        <>
            {hull(-9, 6, W('heavy1') / 2)}
            {hull(9, 6, W('heavy1') / 2)}
            {hull(0, 9, W('heavy1') / 2)}
            {hull(0, -5, W('heavy1') / 1.5)}
            {gun('heavyGun', owner, {x: 0, y: 0})}
        </>
    ),

    heavy2: owner => (
        <>
            {hull(-14, 8, W('heavy2') / 2)}
            {hull(14, 8, W('heavy2') / 2)}
            {hull(15, 24, W('heavy2') / 4)}
            {hull(-15, 24, W('heavy2') / 4)}
            {hull(5, 20, W('heavy2') / 4)}
            {hull(-5, 20, W('heavy2') / 4)}
            {hull(0, -5, W('heavy2') / 1.5)}
            {gun('heavyGun', owner, {x: -14, y: 0})}
            {gun('heavyGun', owner, {x: 14, y: 0})}
        </>
    ),

    heavy3: owner => (
        <>
            {hull(-14, 6, W('heavy3') / 2)}
            {hull(14, 6, W('heavy3') / 2)}
            {hull(15, 22, W('heavy3') / 4)}
            {hull(-15, 22, W('heavy3') / 4)}
            {hull(0, -7, W('heavy3') / 1.5)}
            {gun('heavyGun', owner, {x: -15, y: -5})}
            {gun('heavyGun', owner, {x: 15, y: -5})}
            {/* Минный постановщик стреляет сам, без нажатия — как и у минёра. */}
            {gun('minelayer', owner, {x: 0, y: 28})}
        </>
    ),

    destroyer: owner => (
        <>
            {hull(17, 2, W('destroyer') / 3)}
            {hull(-17, 2, W('destroyer') / 3)}
            {hull(0, -9, W('destroyer') / 3)}
            {hull(5, 2, W('destroyer') / 3)}
            {hull(-5, 2, W('destroyer') / 3)}
            {hull(10, 11, W('destroyer') / 3)}
            {hull(-10, 11, W('destroyer') / 3)}
            {hull(0, 18, W('destroyer') / 2)}
            {gun('rocketLauncher', owner, {x: 20, y: -20}, {angle: 45, damage: 3})}
            {gun('rocketLauncher', owner, {x: 20, y: 20}, {angle: 135, damage: 3})}
            {gun('rocketLauncher', owner, {x: -20, y: 20}, {angle: 225, damage: 3})}
            {gun('rocketLauncher', owner, {x: -20, y: -20}, {angle: 315, damage: 3})}
        </>
    )
};

export default tankArt;
