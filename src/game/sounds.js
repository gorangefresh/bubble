/**
 * Звук выстрела.
 *
 * Было два изъяна. Первый: один общий объект Audio на всю игру — повторный
 * play() по уже играющему звуку ничего не делает, поэтому при скорострельности
 * 230 мс выстрелы звучали примерно через один. Второй: play() возвращает
 * промис, который отклоняется при блокировке автовоспроизведения или при
 * прерывании — его никто не ловил, и в консоль летел unhandled rejection.
 */
const POOL_SIZE = 6;

class Sounds {
    constructor() {
        this.pool = [];
        this.next = 0;
    }

    load() {
        if (this.pool.length) return;

        // BASE_URL учитывает подпапку на gh-pages.
        const src = `${import.meta.env.BASE_URL}1111.wav`;

        for (let i = 0; i < POOL_SIZE; i++) {
            const audio = new Audio(src);
            audio.preload = 'auto';
            this.pool.push(audio);
        }
    }

    shoot() {
        if (!this.pool.length) return;

        const audio = this.pool[this.next];
        this.next = (this.next + 1) % POOL_SIZE;

        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

export default new Sounds();
