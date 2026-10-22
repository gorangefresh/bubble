import {STEP_MS, MAX_FRAME_MS} from '../config/world';

/**
 * Единый игровой цикл с фиксированным шагом симуляции.
 *
 * Было: около двадцати независимых цепочек setTimeout — своя у танка (50 мс),
 * по одной на каждого врага и каждую пулю (30 мс), плюс таймеры перезарядки.
 * Отсюда три проблемы: шаг физики зависел от загрузки потока, цепочки
 * дрейфовали друг относительно друга, а в фоновой вкладке браузер режет
 * setTimeout до одного раза в секунду — игра «телепортировалась».
 *
 * Теперь один requestAnimationFrame. Симуляция считается фиксированными
 * шагами по накопителю (детерминированно и независимо от частоты кадров),
 * а отрисовка — один раз за кадр, с интерполяцией остатка накопителя.
 */
class Loop {
    constructor() {
        this.steppers = [];
        this.renderers = [];

        this.frameId = 0;
        this.last = 0;
        this.acc = 0;
        this.running = false;
        this.paused = false;
    }

    /** Фаза симуляции: вызывается фиксированным шагом, dt в секундах. */
    onStep(fn) {
        this.steppers.push(fn);
        return () => remove(this.steppers, fn);
    }

    /** Фаза отрисовки: один раз за кадр, alpha — доля до следующего шага. */
    onRender(fn) {
        this.renderers.push(fn);
        return () => remove(this.renderers, fn);
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.last = performance.now();
        this.acc = 0;
        this.frameId = requestAnimationFrame(this.frame);
    }

    stop() {
        this.running = false;
        cancelAnimationFrame(this.frameId);
    }

    /**
     * На паузе накопитель обнуляется. Иначе при снятии паузы цикл попытался
     * бы «догнать» всё пропущенное время и сущности прыгнули бы вперёд.
     */
    setPaused(paused) {
        this.paused = paused;
    }

    frame = now => {
        this.frameId = requestAnimationFrame(this.frame);

        const delta = Math.min(now - this.last, MAX_FRAME_MS);
        this.last = now;

        if (this.paused) {
            this.acc = 0;
            return;
        }

        this.acc += delta;

        const dt = STEP_MS / 1000;
        while (this.acc >= STEP_MS) {
            for (let i = 0; i < this.steppers.length; i++) this.steppers[i](dt);
            this.acc -= STEP_MS;
        }

        const alpha = this.acc / STEP_MS;
        for (let i = 0; i < this.renderers.length; i++) this.renderers[i](alpha);
    };
}

function remove(list, fn) {
    const i = list.indexOf(fn);
    if (i !== -1) list.splice(i, 1);
}

export default new Loop();
