export const TO_DEG = 180 / Math.PI;

/**
 * Длина вектора. Math.hypot заметно медленнее из-за защиты от переполнения,
 * которая здесь не нужна: координаты не выходят за пределы поля.
 */
export const length = (dx, dy) => Math.sqrt(dx * dx + dy * dy);

/** Угол от точки к точке в градусах. */
export const angleDeg = (fromX, fromY, toX, toY) =>
    Math.atan2(toY - fromY, toX - fromX) * TO_DEG;

/**
 * Поворот вектора на угол в градусах. Результат пишется в `out`, чтобы
 * в игровом цикле не аллоцировать объект на каждый вызов.
 */
export function rotate(x, y, deg, out) {
    const rad = deg / TO_DEG;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    out.x = x * cos - y * sin;
    out.y = x * sin + y * cos;
    return out;
}

/** Нормирует вектор до длины `speed`, пишет в `out`. Нулевой вектор не трогает. */
export function setMagnitude(dx, dy, speed, out) {
    const len = length(dx, dy);
    if (len === 0) {
        out.x = 0;
        out.y = 0;
    } else {
        out.x = (dx * speed) / len;
        out.y = (dy * speed) / len;
    }
    return out;
}

export const randomSign = () => (Math.random() > 0.5 ? 1 : -1);

/** Случайная точка внутри круга радиуса R. */
export function randomInDisc(R, out) {
    out.x = Math.random() * R * randomSign();
    out.y = Math.random() * Math.sqrt(R * R - out.x * out.x) * randomSign();
    return out;
}

export const clamp = (value, min, max) => (value < min ? min : value > max ? max : value);
