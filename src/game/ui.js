/**
 * Мост между игровой логикой и React.
 *
 * Было: Store хранил сеттеры компонентов прямо в своих полях
 * (`updateBulletPlace`, `screenUpdate`, `setExp`, `select`, `upgrade`),
 * компоненты присваивали их в useEffect без отписки, а логика вызывала
 * чужой setState напрямую. Если компонент размонтировался, в поле
 * оставалась ссылка на мёртвый сеттер.
 *
 * Здесь то же самое, но именованно и с отпиской.
 */
const handlers = new Map();

/** Подписать обработчик. Возвращает функцию отписки — её и возвращаем из useEffect. */
export function bind(name, fn) {
    handlers.set(name, fn);

    return () => {
        if (handlers.get(name) === fn) handlers.delete(name);
    };
}

export function emit(name, payload) {
    const fn = handlers.get(name);
    return fn ? fn(payload) : undefined;
}

export const UI = {
    /** Перерисовать экран при смене уровня. */
    SCREEN: 'screen',
    /** Пересобрать список снарядов и врагов на поле. */
    FIELD: 'field',
    /** Обновить полосу опыта (процент). */
    EXP: 'exp',
    /** Показать/скрыть меню выбора класса. */
    SELECT: 'select',
    /** Сменить корпус танка на новый уровень. */
    UPGRADE: 'upgrade'
};
