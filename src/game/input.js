import session from './session';

/**
 * Единая точка ввода.
 *
 * Было: `Tank` вешал свои три слушателя на document, и вдобавок **каждое**
 * орудие вешало собственные mousedown/mouseup. У Destroyer четыре ракетницы —
 * четыре пары слушателей на один и тот же клик.
 */
class Input {
    constructor() {
        this.pressed = new Set();
        this.firing = false;
    }

    attach() {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);

        // Клавиша могла остаться «нажатой», если окно потеряло фокус
        // с зажатым WASD — тогда танк уезжал сам.
        window.addEventListener('blur', this.reset);
    }

    detach() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('blur', this.reset);

        this.reset();
    }

    reset = () => {
        this.pressed.clear();
        this.firing = false;
    };

    held(code) {
        return this.pressed.has(code);
    }

    onKeyDown = e => this.pressed.add(e.code);
    onKeyUp = e => this.pressed.delete(e.code);

    onMouseMove = e => {
        if (!session.pause) session.setMouse(e);
    };

    onMouseDown = () => {
        this.firing = true;
    };

    onMouseUp = () => {
        this.firing = false;
    };
}

export default new Input();
