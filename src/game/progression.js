import tanks from '../config/tanks';
import {EXP_CAP, expRatio, levelForExp} from '../config/progression';
import {clamp} from '../engine/math';
import session from './session';
import {emit, UI} from './ui';

/** Резолвер ожидания выбора класса в меню апгрейда. */
let awaitingChoice = null;

/** Приводит характеристики героя в соответствие уровню и выбранному классу. */
function applyTank() {
    const stats = tanks[session.heroTankId];

    session.hero.stats = stats;
    session.hero.R = stats.R;

    emit(UI.UPGRADE, session.hero.level);
}

/**
 * Начисляет (или отнимает при попадании) опыт.
 *
 * Было: ожидание выбора класса крутилось опросом — рекурсивный
 * `selectMenu()` с `await delay(100)` до снятия паузы. Теперь обычный
 * промис, который резолвит `chooseClass`.
 */
export async function addExp(amount) {
    const {hero} = session;

    hero.exp = clamp(hero.exp + amount, 0, EXP_CAP);

    const level = levelForExp(hero.exp);

    if (level > hero.level) {
        hero.level = level;

        if (!session.upgradeTree[level]) {
            session.setPaused(true);
            emit(UI.SELECT, true);

            // Пока открыто меню, полоса показана заполненной.
            emit(UI.EXP, 100);

            await new Promise(resolve => {
                awaitingChoice = resolve;
            });
        }

        applyTank();
    }

    emit(UI.EXP, expRatio(hero.exp, hero.level));
}

/** Выбор класса в меню апгрейда. */
export function chooseClass(name) {
    session.upgradeTree[session.hero.level] = name;

    emit(UI.SELECT, false);
    session.setPaused(false);

    const resolve = awaitingChoice;
    awaitingChoice = null;
    if (resolve) resolve();
}
