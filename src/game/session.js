import {createCell, MATRIX_SIDE, RING_COUNT} from '../config/levels';
import tanks, {TANK_BY_LEVEL} from '../config/tanks';
import {FIELD_D, FIELD_R} from '../config/world';
import Loop from '../engine/Loop';
import {emit, UI} from './ui';

/** Расстояние индекса до ближайшего края карты. */
const edgeDistance = index => Math.min(index, MATRIX_SIDE - 1 - index);

/**
 * Номер кольца для ячейки карты: в центре — нулевое (пустой старт),
 * к краям сложность растёт.
 *
 * Было: init() заливал всю сетку самым тяжёлым уровнем, затем тридцатью
 * строками вложенных циклов перекрывал её концентрическими квадратами,
 * клонируя каждую из 225 ячеек через JSON.parse(JSON.stringify(...)) —
 * причём строки и столбцы 0 и 14 перекрыть «не успевал» и они оставались
 * самыми сложными. Это ровно та же раскладка, но одной формулой.
 */
const ringAt = (i, j) =>
    RING_COUNT - 1 - Math.min(edgeDistance(i), edgeDistance(j));

const cellKey = (i, j) => `${i}-${j}`;

class Session {
    constructor() {
        /** Все ячейки карты с их состоянием: `${i}-${j}` -> cell. */
        this.matrix = null;

        /** Индекс текущей ячейки. */
        this.i = 0;
        this.j = 0;
        this.startI = 0;
        this.startJ = 0;

        /** Текущая ячейка — тот же объект, что лежит в matrix. */
        this.current = null;

        this.matrixLength = MATRIX_SIDE - 1;

        this.pause = false;
        /** Перелёт между уровнями: на это время снаряды снимаются с поля. */
        this.travel = false;

        /** Координаты курсора в системе координат окна. */
        this.mouse = {x: 0, y: 0};

        /**
         * Центр текущего поля в координатах окна. Было `currentBasePosition`.
         * Нужен для перевода между слоями: сущности поля живут в координатах
         * относительно центра, а герой и курсор — в координатах окна.
         */
        this.fieldCenter = {x: 0, y: 0};

        /** Герой. Было `mainTank`. */
        this.hero = {
            x: 0,
            y: 0,
            exp: 0,
            level: 0,
            angle: 0,
            stats: tanks.base,
            R: tanks.base.R
        };

        /** Выбранный класс на каждом уровне. */
        this.upgradeTree = {0: 'light'};

        /** Снаряды в полёте: id -> React-элемент. */
        this.bullets = {};
    }

    init() {
        const matrix = {};

        for (let i = 0; i < MATRIX_SIDE; i++) {
            for (let j = 0; j < MATRIX_SIDE; j++) {
                matrix[cellKey(i, j)] = createCell(ringAt(i, j));
            }
        }

        this.matrix = matrix;
        this.i = RING_COUNT - 1;
        this.j = RING_COUNT - 1;
        this.startI = this.i;
        this.startJ = this.j;
        this.current = matrix[this.key];
    }

    get key() {
        return cellKey(this.i, this.j);
    }

    /** Текущий корпус героя по уровню и выбранному классу. */
    get heroTankId() {
        const {level} = this.hero;
        return TANK_BY_LEVEL[level][this.upgradeTree[level] || 'light'];
    }

    setPaused(paused) {
        this.pause = paused;
        Loop.setPaused(paused);
    }

    setMouse(event) {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
    }

    /**
     * Центр текущего поля в координатах окна.
     *
     * Было: Playground мерил свой getBoundingClientRect, причём при смене
     * уровня — через `setTimeout(..., 800)`, подогнанный под CSS-переход
     * длительностью .7s. На деле центральная ячейка всегда стоит в
     * `left/top: 50%` от .screen, то есть центр поля — это ровно центр
     * экрана, и ждать конца анимации не нужно.
     */
    setFieldCenter(x, y) {
        this.fieldCenter.x = x;
        this.fieldCenter.y = y;
    }

    /**
     * Пять ячеек, которые реально участвуют в рендере: текущая и четыре
     * соседние по тору. Было: Screen создавал компонент на каждую из 225
     * ячеек, и 220 из них возвращали null.
     */
    visibleCells() {
        const {i, j} = this;
        const wrap = v => (v + MATRIX_SIDE) % MATRIX_SIDE;

        return [
            {key: cellKey(i, j), position: 'center', left: '50%', top: '50%'},
            {key: cellKey(i, wrap(j - 1)), position: 'left', left: '-150%', top: '50%'},
            {key: cellKey(i, wrap(j + 1)), position: 'right', left: '150%', top: '50%'},
            {key: cellKey(wrap(i - 1), j), position: 'top', left: '50%', top: '-150%'},
            {key: cellKey(wrap(i + 1), j), position: 'bottom', left: '50%', top: '150%'}
        ];
    }

    /** Подсказка на стартовой ячейке и на четырёх соседних с ней. */
    hintFor(key) {
        const {startI, startJ} = this;

        if (key === cellKey(startI, startJ)) return 'start';

        const neighbours = [
            cellKey(startI + 1, startJ),
            cellKey(startI - 1, startJ),
            cellKey(startI, startJ + 1),
            cellKey(startI, startJ - 1)
        ];

        return neighbours.includes(key) ? 'next' : null;
    }

    /** Поле ещё не измерено — до этого проверки границы бессмысленны. */
    get fieldReady() {
        return this.fieldCenter.x !== 0 || this.fieldCenter.y !== 0;
    }

    /**
     * Объект радиуса `r` в точке (x, y) поля дошёл до границы пузыря.
     * Без извлечения корня: сравниваем квадраты.
     */
    touchEdge(x, y, r = 0) {
        if (!this.fieldReady) return false;

        const reach = FIELD_R - r;
        if (reach <= 0) return true;

        return x * x + y * y >= reach * reach;
    }

    /** Враг уничтожен — убираем из состояния ячейки. Было `checkOut` + `toEmpty`. */
    unregisterEnemy(id) {
        const cell = this.matrix[this.key];
        delete cell.enemy[id];

        if (Object.keys(cell.enemy).length === 0) cell.empty = true;
    }

    /**
     * Переход на соседний уровень. Возвращает смещение, на которое надо
     * сдвинуть героя, чтобы он «въехал» в новое поле с нужной стороны.
     *
     * Математика сохранена как была, включая то, что сдвиг по экранной
     * оси X меняет индекс `j`, а по Y — индекс `i`.
     */
    changeLevel() {
        const tankD = this.hero.stats.width;
        const radiusDelta = d => (FIELD_R - Math.abs(d)) * 2 + tankD;

        const x = this.hero.x - this.fieldCenter.x;
        const y = this.hero.y - this.fieldCenter.y;

        let delta;

        if (Math.abs(x) >= Math.abs(y)) {
            if (x > 0) {
                this.j = this.j === this.matrixLength ? 0 : this.j + 1;
                delta = {x: -FIELD_D + radiusDelta(x), y: 0};
            } else {
                this.j = this.j === 0 ? this.matrixLength : this.j - 1;
                delta = {x: FIELD_D - radiusDelta(x), y: 0};
            }
        } else if (y > 0) {
            this.i = this.i === this.matrixLength ? 0 : this.i + 1;
            delta = {x: 0, y: -FIELD_D + radiusDelta(y)};
        } else {
            this.i = this.i === 0 ? this.matrixLength : this.i - 1;
            delta = {x: 0, y: FIELD_D - radiusDelta(y)};
        }

        this.current = this.matrix[this.key];
        emit(UI.SCREEN, this.key);

        return delta;
    }
}

export default new Session();
