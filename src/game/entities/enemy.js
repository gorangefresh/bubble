import {FIELD_R} from '../../config/world';
import nextId from '../../engine/ids';
import World from '../../engine/World';
import {angleDeg, randomInDisc, randomSign, setMagnitude} from '../../engine/math';
import session from '../session';

/** Переиспользуемый буфер — в цикле не аллоцируем. */
const scratch = {x: 0, y: 0};

/**
 * Новая случайная цель и курс на неё.
 *
 * Координаты цели выбираются по осям независимо, поэтому точка может
 * оказаться за кругом поля. Так было изначально — именно поэтому враги
 * регулярно доходят до границы и отворачивают.
 */
function pickDestination(enemy) {
    enemy.destination.x = Math.random() * FIELD_R * randomSign();
    enemy.destination.y = Math.random() * FIELD_R * randomSign();

    setMagnitude(
        enemy.destination.x - enemy.x,
        enemy.destination.y - enemy.y,
        enemy.speed,
        scratch
    );

    enemy.vx = scratch.x;
    enemy.vy = scratch.y;

    // Было: вызов при касании границы себя не перепланировал, и цепочка
    // смены курса обрывалась навсегда после первого касания края.
    enemy.retargetIn = Math.random() * enemy.trajectoryChangeRate;

    // Минёр доворачивает только при смене курса. На прямой это тот же угол,
    // но если он проскочит точку назначения — не разворачивается назад.
    if (enemy.facesDestination) {
        enemy.angle = angleDeg(enemy.x, enemy.y, enemy.destination.x, enemy.destination.y) + 90;
    }
}

function stepEnemy(enemy, dt) {
    if (enemy.startDelay > 0) {
        enemy.startDelay -= dt * 1000;
        return;
    }

    enemy.retargetIn -= dt * 1000;
    if (enemy.retargetIn <= 0) pickDestination(enemy);

    enemy.x += enemy.vx * dt;
    enemy.y += enemy.vy * dt;

    if (session.touchEdge(enemy.x, enemy.y, enemy.edgeR)) pickDestination(enemy);

    if (!enemy.facesDestination) {
        // Ствол смотрит на героя. Герой живёт в координатах окна.
        const targetX = session.hero.x - session.fieldCenter.x;
        const targetY = session.hero.y - session.fieldCenter.y;

        enemy.angle = angleDeg(enemy.x, enemy.y, targetX, targetY) + 90;
    }
}

/**
 * @param slot   ключ врага в состоянии ячейки
 * @param record запись `cell.enemy[slot]` — в ней живёт hp, поэтому
 *               подранок остаётся подранком, если уйти с уровня и вернуться
 * @param onRemove колбэк для React — снять компонент с рендера
 */
export function createEnemy({slot, record, onRemove}) {
    const config = record;

    const enemy = {
        kind: 'enemy',
        id: nextId(`enemy-${config.type}`),
        slot,
        type: config.type,
        node: null,

        // Урон пишется в запись ячейки, а не в сущность: сущность живёт
        // только пока уровень на экране.
        record,

        x: 0,
        y: 0,
        vx: 0,
        vy: 0,

        // Два радиуса: R — хитбокс, edgeR — половина ширины корпуса для
        // проверки границы поля. Так было и раньше, просто неявно: одно
        // значение лежало в конфиге, другое считалось в классе.
        R: config.R,
        edgeR: config.width / 2,

        xp: config.xp,
        speed: config.speed,
        trajectoryChangeRate: config.trajectoryChangeRate,
        startDelay: config.startDelay || 0,
        facesDestination: config.facesDestination || false,

        angle: 0,
        destination: {x: 0, y: 0},
        retargetIn: 0,

        step: stepEnemy,
        onRemove
    };

    // Появление — случайная точка внутри поля с отступом на корпус.
    randomInDisc(FIELD_R - config.width, enemy);
    pickDestination(enemy);

    return World.add(enemy);
}
