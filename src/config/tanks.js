import {perTick, LEGACY_TICK} from './world';

/** Множитель скорости при движении по диагонали. */
export const DIAGONAL_FACTOR = 0.66;

const tank = (speed, width) => ({
    speed: perTick(speed, LEGACY_TICK.tank),
    width,
    R: width / 2
});

/**
 * Характеристики корпусов. Раньше `speed` и `width` лежали в каждом из
 * одиннадцати классов-наследников TankView, а их конструктор писал эти
 * значения прямо в глобальный Store.mainTank — то есть вид настраивал
 * физику. Теперь числа здесь, а компоненты отвечают только за вид.
 */
const tanks = {
    base: tank(20, 40),

    light1: tank(25, 40),
    light2: tank(25, 40),
    light3: tank(25, 40),

    balanced1: tank(20, 40),
    balanced2: tank(20, 40),
    balanced3: tank(20, 40),

    heavy1: tank(15, 55),
    heavy2: tank(13, 55),
    heavy3: tank(12, 55),

    destroyer: tank(20, 40)
};

/** (уровень, класс) -> id корпуса. */
export const TANK_BY_LEVEL = {
    0: {light: 'base', heavy: 'base', balanced: 'base'},
    1: {light: 'light1', heavy: 'heavy1', balanced: 'balanced1'},
    2: {light: 'light2', heavy: 'heavy2', balanced: 'balanced2'},
    3: {light: 'light3', heavy: 'heavy3', balanced: 'balanced3'},
    4: {light: 'destroyer', heavy: 'destroyer', balanced: 'destroyer'}
};

export default tanks;
