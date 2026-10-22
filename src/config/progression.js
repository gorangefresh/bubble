/** Порог опыта для входа в уровень. Индекс — номер уровня танка. */
export const EXP_THRESHOLDS = [0, 5, 20, 40, 70, 110];

/** Последний уровень, на котором ещё предлагается выбор класса. */
export const MAX_LEVEL = 4;

/** Потолок опыта. */
export const EXP_CAP = EXP_THRESHOLDS[EXP_THRESHOLDS.length - 1];

/** Классы, доступные в меню выбора. */
export const CLASSES = ['light', 'heavy', 'balanced'];

/** Что за пушку даёт класс на каждом уровне — тексты для меню выбора. */
export const CLASS_DESCRIPTION = {
    light: {
        1: 'light machine gun',
        2: 'twin light machine gun',
        3: 'heavy machine gun'
    },
    heavy: {
        1: 'heavy cannon',
        2: 'twin heavy cannon',
        3: 'twin heavy cannon and mine layer'
    },
    balanced: {
        1: 'twin cannon',
        2: 'rocket launcher',
        3: 'twin rocket launcher'
    }
};

/**
 * Доля опыта внутри текущего уровня, 0..100 — то, что рисует полоса опыта.
 *
 * Было: при потере опыта уровень не понижался, и формула давала
 * отрицательный процент, который уезжал в `width: -25%`.
 */
export function expRatio(exp, level) {
    const from = EXP_THRESHOLDS[level];
    const to = EXP_THRESHOLDS[level + 1];

    if (to === undefined) return 100;

    const ratio = (100 * (exp - from)) / (to - from);
    return Math.min(100, Math.max(0, ratio));
}

/** Уровень, достижимый с данным опытом. */
export function levelForExp(exp) {
    let level = 0;
    while (level < MAX_LEVEL && exp >= EXP_THRESHOLDS[level + 1]) level++;
    return level;
}
