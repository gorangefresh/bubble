import World from '../engine/World';
import session from './session';
import {addExp} from './progression';

/**
 * Попадание снаряда героя во врага. Координаты — в системе координат поля.
 *
 * Было: линейный перебор всех врагов и сравнение по осевому квадрату
 * (`pos.x - R < x && x < pos.x + R && ...`), причём радиус самого снаряда
 * не учитывался вовсе. Теперь кандидаты берутся из сетки, а проверка —
 * круг с кругом по квадрату расстояния, без извлечения корня.
 */
export function hitEnemy(x, y, r, damage) {
    const candidates = World.queryEnemies(x, y, r);

    for (let i = 0; i < candidates.length; i++) {
        const enemy = candidates[i];
        if (enemy.dead) continue;

        const dx = enemy.x - x;
        const dy = enemy.y - y;
        const reach = enemy.R + r;

        if (dx * dx + dy * dy > reach * reach) continue;

        // hp живёт в записи ячейки — подранок остаётся подранком, если
        // уйти с уровня и вернуться.
        enemy.record.hp -= damage;

        if (enemy.record.hp <= 0) {
            addExp(enemy.xp);
            World.kill(enemy);
        }

        return true;
    }

    return false;
}

/** Попадание снаряда противника в героя. Снаряд — в координатах поля. */
export function hitHero(x, y, r, damage) {
    const {hero, fieldCenter} = session;

    const dx = hero.x - (x + fieldCenter.x);
    const dy = hero.y - (y + fieldCenter.y);
    const reach = hero.R + r;

    if (dx * dx + dy * dy > reach * reach) return false;

    addExp(-damage);
    return true;
}

/** Функция попадания по стороне стрелка. */
export const hitFor = parent => (parent === 'hero' ? hitEnemy : hitHero);
