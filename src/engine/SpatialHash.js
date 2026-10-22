import enemiesConfig from '../config/enemies';
import {FIELD_D, FIELD_R, CELL_SIZE} from '../config/world';
import {clamp} from './math';

/** Сторона сетки в ячейках; +1 на границу поля. */
const SIDE = Math.ceil(FIELD_D / CELL_SIZE) + 1;

/**
 * Самый крупный участник коллизий. Объекты кладутся в сетку по центру,
 * поэтому запрос расширяется на этот радиус, чтобы не потерять того,
 * чей центр лежит в соседней ячейке.
 */
const MAX_ENTITY_R = Math.max(...Object.values(enemiesConfig).map(e => e.R));

/**
 * Равномерная сетка для широкой фазы коллизий.
 *
 * Было: `Store.hit` линейно перебирал всех врагов для каждой пули на каждом
 * тике — O(пули × враги) и к тому же сравнивал по квадрату (AABB), из-за чего
 * срабатывали попадания «по углам» хитбокса.
 *
 * Поле ограничено кругом радиуса FIELD_R, поэтому сетка — плоский массив
 * фиксированного размера, без Map и без хеширования ключей. Координаты за
 * границей зажимаются в краевые ячейки: зажим монотонный, поэтому пары
 * близких объектов он развести не может и широкая фаза ничего не теряет.
 */
export default class SpatialHash {
    constructor() {
        this.buckets = [];
        for (let i = 0; i < SIDE * SIDE; i++) this.buckets.push([]);

        // Список задействованных ячеек, чтобы clear() не обходил всю сетку.
        this.touched = [];
    }

    clear() {
        for (let i = 0; i < this.touched.length; i++) {
            this.buckets[this.touched[i]].length = 0;
        }
        this.touched.length = 0;
    }

    cell(value) {
        return clamp(Math.floor((value + FIELD_R) / CELL_SIZE), 0, SIDE - 1);
    }

    insert(entity) {
        const index = this.cell(entity.y) * SIDE + this.cell(entity.x);
        const bucket = this.buckets[index];

        if (bucket.length === 0) this.touched.push(index);
        bucket.push(entity);
    }

    /**
     * Кандидаты в радиусе `r` вокруг точки. Пишет в переданный массив,
     * чтобы не аллоцировать в игровом цикле.
     */
    query(x, y, r, out) {
        out.length = 0;

        const reach = r + MAX_ENTITY_R;
        const fromX = this.cell(x - reach);
        const toX = this.cell(x + reach);
        const fromY = this.cell(y - reach);
        const toY = this.cell(y + reach);

        for (let cy = fromY; cy <= toY; cy++) {
            const row = cy * SIDE;
            for (let cx = fromX; cx <= toX; cx++) {
                const bucket = this.buckets[row + cx];
                for (let i = 0; i < bucket.length; i++) out.push(bucket[i]);
            }
        }

        return out;
    }
}
