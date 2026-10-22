import gunsConfig from '../../config/guns';
import World from '../../engine/World';
import {rotate} from '../../engine/math';
import input from '../input';
import session from '../session';
import Sounds from '../sounds';
import {spawnBullet} from './bullet';

/** Переиспользуемые буферы — в цикле не аллоцируем. */
const muzzle = {x: 0, y: 0};
const aim = {x: 0, y: 0};

/**
 * Позиция дула в координатах носителя.
 *
 * Было: `this.gun.current.getBoundingClientRect()` плюс ещё один rect для
 * корпуса — два принудительных пересчёта лейаута на каждый выстрел. Смещение
 * орудия задано в системе координат корпуса, поэтому достаточно повернуть
 * его на угол корпуса и прибавить позицию.
 */
function muzzleAt(gun, out) {
    const {owner} = gun;

    rotate(gun.offset.x, gun.offset.y, owner.angle, out);
    out.x += owner.x;
    out.y += owner.y;

    return out;
}

/** Направление стрельбы героя: на курсор, с поправкой на разворот орудия. */
function heroAim(gun, out) {
    const dx = session.mouse.x - session.hero.x;
    const dy = session.mouse.y - session.hero.y;

    if (gun.angle) return rotate(dx, dy, gun.angle, out);

    out.x = dx;
    out.y = dy;
    return out;
}

function fire(gun) {
    muzzleAt(gun, muzzle);

    if (gun.parent === 'hero') {
        heroAim(gun, aim);

        // Герой живёт в координатах окна, снаряды — в координатах поля.
        spawnBullet({
            type: gun.bullet,
            parent: gun.parent,
            damage: gun.damage,
            x: muzzle.x - session.fieldCenter.x,
            y: muzzle.y - session.fieldCenter.y,
            dirX: aim.x,
            dirY: aim.y,
            render: gun.renderBullet
        });

        Sounds.shoot();
        return;
    }

    // Противник уже в координатах поля, герой — в координатах окна.
    const targetX = session.hero.x - session.fieldCenter.x;
    const targetY = session.hero.y - session.fieldCenter.y;

    spawnBullet({
        type: gun.bullet,
        parent: gun.parent,
        damage: gun.damage,
        x: muzzle.x,
        y: muzzle.y,
        dirX: targetX - muzzle.x,
        dirY: targetY - muzzle.y,
        render: gun.renderBullet
    });
}

/**
 * Тик перезарядки.
 *
 * Здесь же структурно вылечен залипающий ствол. Было: `shoot()` сначала
 * выставлял `shooting.fire = false`, и только потом проверял `!Store.pause`.
 * Один mousedown на паузе — и флаг навсегда оставался false, а `allowFire`
 * не планировался: орудие замолкало до конца игры. Теперь откат заряда
 * обновляется только при фактическом выстреле, и залипать нечему.
 */
function stepGun(gun, dt) {
    if (gun.cooldown > 0) gun.cooldown -= dt * 1000;
    if (gun.cooldown > 0) return;

    if (!gun.auto && !input.firing) return;
    if (gun.owner.dead) return;

    fire(gun);
    gun.cooldown = gun.fireRate;
}

/**
 * @param type   ключ в config/guns
 * @param owner  сущность-носитель (танк героя или противник)
 * @param parent 'hero' | 'enemy' — сторона стрелка
 * @param offset смещение орудия в системе координат корпуса
 * @param angle  разворот орудия относительно корпуса, градусы
 * @param damage переопределение урона (у Destroyer ракетницы усилены)
 * @param renderBullet функция, строящая React-элемент снаряда
 */
export function createGun({type, owner, parent, offset, angle = 0, damage, renderBullet}) {
    const config = gunsConfig[type];

    return World.add({
        kind: 'gun',
        node: null,

        // Орудие не двигается само — координаты нужны только World.
        x: 0,
        y: 0,
        R: 0,
        angle,

        owner,
        parent,
        offset,
        bullet: config.bullet,
        fireRate: config.fireRate,
        damage: damage === undefined ? config.damage : damage,
        auto: config.auto || false,

        // Первый выстрел противника разнесён по времени, иначе вся комната
        // стреляет синхронным залпом.
        cooldown: config.auto ? config.fireRate * Math.random() : 0,

        renderBullet,
        step: stepGun
    });
}
