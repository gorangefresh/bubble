import {DIAGONAL_FACTOR} from '../../config/tanks';
import World from '../../engine/World';
import {angleDeg} from '../../engine/math';
import input from '../input';
import session from '../session';

/**
 * Герой — это и есть сущность session.hero: один объект, никакой
 * синхронизации «состояние <-> физика».
 */
function stepTank(tank, dt) {
    let dx = 0;
    let dy = 0;

    if (input.held('KeyW') && !input.held('KeyS')) dy -= 1;
    if (input.held('KeyS') && !input.held('KeyW')) dy += 1;
    if (input.held('KeyA') && !input.held('KeyD')) dx -= 1;
    if (input.held('KeyD') && !input.held('KeyA')) dx += 1;

    // По диагонали замедляется каждая ось по отдельности — так было
    // изначально, через отдельное поле halfSpeed.
    const speed = tank.stats.speed * (dx !== 0 && dy !== 0 ? DIAGONAL_FACTOR : 1);

    tank.x += dx * speed * dt;
    tank.y += dy * speed * dt;

    // aim — направление на курсор, им пользуются орудия.
    // angle — то же плюс 90°, под ориентацию вёрстки корпуса.
    tank.aim = angleDeg(tank.x, tank.y, session.mouse.x, session.mouse.y);
    tank.angle = tank.aim + 90;

    const atEdge = session.touchEdge(
        tank.x - session.fieldCenter.x,
        tank.y - session.fieldCenter.y
    );

    if (atEdge && !session.travel) tank.onTravel();
}

/** @param onTravel что делать при касании границы поля */
export function createTank({onTravel}) {
    const {hero} = session;

    hero.kind = 'tank';
    hero.node = null;
    hero.vx = 0;
    hero.vy = 0;
    hero.aim = 0;
    hero.angle = 90;
    hero.onTravel = onTravel;
    hero.step = stepTank;

    // Старт в центре окна. Было в конструкторе Tank через document.body.
    if (!hero.x && !hero.y) {
        hero.x = window.innerWidth / 2;
        hero.y = window.innerHeight / 2;
    }

    return World.add(hero);
}

export function removeTank() {
    World.remove(session.hero);
}
