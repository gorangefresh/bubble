import {perTick, LEGACY_TICK} from './world';

/**
 * Характеристики противников. R — радиус для коллизий, speed — px/сек.
 * trajectoryChangeRate — верхняя граница случайного интервала смены курса, мс.
 */
const enemies = {
    plainEnemy: {
        type: 'plainEnemy',
        hp: 2,
        xp: 2,
        R: 15,
        width: 30,
        speed: perTick(4.5, LEGACY_TICK.entity),
        trajectoryChangeRate: 5000
    },
    lightEnemy: {
        type: 'lightEnemy',
        hp: 3,
        xp: 3,
        R: 20,
        width: 40,
        speed: perTick(6, LEGACY_TICK.entity),
        trajectoryChangeRate: 5000
    },
    heavyEnemy: {
        type: 'heavyEnemy',
        hp: 8,
        xp: 5,
        R: 30,
        width: 60,
        speed: perTick(3, LEGACY_TICK.entity),
        trajectoryChangeRate: 5000
    },
    minerEnemy: {
        type: 'minerEnemy',
        hp: 10,
        xp: 5,
        R: 25,
        width: 40,
        speed: perTick(4.5, LEGACY_TICK.entity),
        trajectoryChangeRate: 5000,
        // Минёр секунду стоит на месте после появления.
        startDelay: 800,
        // И смотрит туда, куда едет, а не на героя.
        facesDestination: true
    },
    machineGunEnemy: {
        type: 'machineGunEnemy',
        hp: 5,
        xp: 5,
        R: 25,
        width: 40,
        speed: perTick(4.5, LEGACY_TICK.entity),
        trajectoryChangeRate: 5000
    }
};

export default enemies;
