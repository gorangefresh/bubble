import enemies from './enemies';

/**
 * Состав уровней по возрастанию сложности: ring 0 — стартовая пустая
 * «поляна», дальше от центра карты — тяжелее.
 *
 * Раньше массив был записан в обратном порядке (level 7 первым), а
 * индекс в нём одновременно означал и номер кольца на карте — читать это
 * было почти невозможно. Теперь индекс = номер кольца, а `label` — то, что
 * показывается как номер уровня.
 */
const rings = [
    {label: 0, enemies: {}},
    {label: 1, enemies: {plainEnemy: 4}},
    {label: 2, enemies: {lightEnemy: 4, plainEnemy: 2}},
    {label: 3, enemies: {heavyEnemy: 3, lightEnemy: 1, minerEnemy: 1, plainEnemy: 1}},
    {label: 4, enemies: {machineGunEnemy: 1, lightEnemy: 5, heavyEnemy: 1}},
    {label: 5, enemies: {machineGunEnemy: 1, lightEnemy: 5, heavyEnemy: 2}},
    {label: 6, enemies: {machineGunEnemy: 1, lightEnemy: 6, heavyEnemy: 3}},
    {label: 7, enemies: {machineGunEnemy: 4, heavyEnemy: 4}}
];

export const RING_COUNT = rings.length;

/** Сторона карты: 15 ячеек при 8 кольцах. */
export const MATRIX_SIDE = RING_COUNT * 2 - 1;

/**
 * Собирает свежую ячейку карты для заданного кольца.
 *
 * Было: `initLevels()` декрементировал счётчики прямо в конфиге
 * (`i.enemies[j]--`), поэтому повторный вызов `init()` давал карту, целиком
 * состоящую из пустых уровней. Плюс каждая из 169 ячеек клонировалась через
 * JSON.parse(JSON.stringify(...)). Теперь конфиг не мутируется, а ячейка
 * собирается фабрикой.
 */
export function createCell(ring) {
    const source = rings[ring];
    const enemy = {};
    let id = 1;

    for (const [type, count] of Object.entries(source.enemies)) {
        for (let n = 0; n < count; n++) {
            enemy[id++] = {...enemies[type]};
        }
    }

    return {
        ring,
        label: source.label,
        enemy,
        empty: id === 1
    };
}

export default rings;
