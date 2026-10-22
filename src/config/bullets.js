import {perTick, LEGACY_TICK} from './world';

/**
 * Снаряды. `d` — диаметр для отрисовки, `R` — радиус для коллизий.
 *
 * Радиус снаряда раньше в расчёте попадания не участвовал вовсе: проверялся
 * только квадрат вокруг врага, а пуля считалась точкой.
 */
const bullets = {
    bullet: {
        speed: perTick(18, LEGACY_TICK.entity),
        d: 10,
        R: 5
    },
    bigBullet: {
        speed: perTick(12, LEGACY_TICK.entity),
        d: 20,
        R: 10
    },
    hunter: {
        speed: perTick(9, LEGACY_TICK.entity),
        d: 15,
        R: 7.5,
        // Самонаведение включается не сразу, иначе ракета разворачивается
        // на цель прямо в стволе.
        homing: true,
        captureDelay: 200
    },
    mine: {
        speed: 0,
        d: 15,
        R: 7.5,
        // По истечении срока мина детонирует сама.
        lifeTime: 7000
    }
};

export default bullets;
