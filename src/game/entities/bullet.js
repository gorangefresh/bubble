import bulletsConfig from '../../config/bullets';
import nextId from '../../engine/ids';
import World from '../../engine/World';
import {angleDeg, setMagnitude} from '../../engine/math';
import {hitFor} from '../combat';
import session from '../session';
import {emit, UI} from '../ui';

/** Переиспользуемый буфер — в цикле не аллоцируем. */
const scratch = {x: 0, y: 0};

/** Ближайший живой враг к точке поля. */
function nearestEnemy(x, y) {
    const list = World.enemy;
    let best = null;
    let bestDistance = Infinity;

    for (let i = 0; i < list.length; i++) {
        const enemy = list[i];
        if (enemy.dead) continue;

        const dx = enemy.x - x;
        const dy = enemy.y - y;
        const distance = dx * dx + dy * dy;

        if (distance < bestDistance) {
            bestDistance = distance;
            best = enemy;
        }
    }

    return best;
}

/** Самонаведение: доворот прямо на ближайшую цель. */
function steer(bullet) {
    if (bullet.target && bullet.target.dead) bullet.target = null;
    if (!bullet.target) bullet.target = nearestEnemy(bullet.x, bullet.y);

    // Цели кончились — ракета летит дальше по прямой.
    if (!bullet.target) return;

    const {target} = bullet;
    setMagnitude(target.x - bullet.x, target.y - bullet.y, bullet.speed, scratch);

    bullet.vx = scratch.x;
    bullet.vy = scratch.y;
    bullet.angle = angleDeg(bullet.x, bullet.y, target.x, target.y) + 90;
}

function stepBullet(bullet, dt) {
    bullet.age += dt * 1000;

    // Мина детонирует по истечении срока. Было: по таймеру подменялась
    // сама функция попадания на `() => true`, причём setTimeout заводился
    // прямо внутри render().
    if (bullet.lifeTime && bullet.age >= bullet.lifeTime) {
        World.kill(bullet);
        return;
    }

    if (bullet.homing && bullet.age >= bullet.captureDelay) steer(bullet);

    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;

    // Неподвижная мина у границы поля не исчезает.
    const atEdge = bullet.speed > 0 && session.touchEdge(bullet.x, bullet.y);

    if (session.travel || atEdge || bullet.hit(bullet.x, bullet.y, bullet.R, bullet.damage)) {
        World.kill(bullet);
    }
}

/**
 * Выпускает снаряд.
 *
 * @param type   ключ в config/bullets
 * @param parent 'hero' | 'enemy' — определяет, по кому снаряд попадает
 * @param damage урон, задаётся орудием
 * @param x, y   точка вылета в координатах поля
 * @param dirX, dirY  направление (нормировать не нужно)
 * @param render функция, строящая React-элемент по сущности
 */
export function spawnBullet({type, parent, damage, x, y, dirX, dirY, render}) {
    const config = bulletsConfig[type];
    const id = nextId(`bullet-${parent}`);

    const bullet = {
        kind: 'bullet',
        id,
        type,
        parent,
        node: null,

        x,
        y,
        vx: 0,
        vy: 0,
        R: config.R,
        d: config.d,
        speed: config.speed,
        damage,
        age: 0,

        homing: config.homing || false,
        captureDelay: config.captureDelay || 0,
        lifeTime: config.lifeTime || 0,
        target: null,

        angle: angleDeg(0, 0, dirX, dirY) + 90,
        hit: hitFor(parent),
        step: stepBullet,
        onRemove: removeBullet
    };

    setMagnitude(dirX, dirY, config.speed, scratch);
    bullet.vx = scratch.x;
    bullet.vy = scratch.y;

    World.add(bullet);

    session.bullets[id] = render(bullet);
    emit(UI.FIELD, id);

    return bullet;
}

function removeBullet(bullet) {
    delete session.bullets[bullet.id];
    emit(UI.FIELD, bullet.id);
}

/** Снять все снаряды — при смене уровня. */
export function clearBullets() {
    const list = World.bullet;
    for (let i = list.length - 1; i >= 0; i--) World.kill(list[i]);

    session.bullets = {};
}
