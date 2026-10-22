import Loop from './Loop';
import SpatialHash from './SpatialHash';

/**
 * Реестр игровых сущностей и порядок фаз внутри шага.
 *
 * Сущность — обычный объект:
 *   kind    'tank' | 'enemy' | 'bullet' — определяет порядок обработки
 *   x, y    позиция в координатах своего слоя
 *   px, py  позиция на предыдущем шаге (для интерполяции при отрисовке)
 *   vx, vy  скорость, px/сек
 *   R       радиус для коллизий
 *   angle   угол поворота в градусах — ровно то, что уходит в rotate()
 *   node    DOM-узел или null
 *   frozen  исключена из симуляции и отрисовки (перелёт между уровнями)
 *   dead    помечена к снятию
 *   step(entity, dt)  поведение
 *   onRemove()        колбэк для React — убрать из рендера
 *
 * Ключевое: симуляция ничего не читает из DOM. Раньше `Enemy.turn()`
 * вызывал getBoundingClientRect() 33 раза в секунду на каждого врага, причём
 * сразу после записи style.left/top — то есть провоцировал принудительный
 * синхронный пересчёт лейаута на каждом тике. Углы и позиции орудий теперь
 * считаются арифметикой по уже известным координатам.
 */
class World {
    constructor() {
        this.tank = [];
        // Орудия — тоже сущности, но без узла и без координат: им нужен
        // только тик перезарядки. Раньше каждое держало свой setTimeout.
        this.gun = [];
        this.enemy = [];
        this.bullet = [];

        this.grid = new SpatialHash();

        // Переиспользуемые буферы: в игровом цикле не аллоцируем.
        this.candidates = [];
        this.corpses = [];

        Loop.onStep(this.step);
        Loop.onRender(this.render);
    }

    add(entity) {
        entity.px = entity.x;
        entity.py = entity.y;
        entity.dead = false;
        entity.frozen = entity.frozen || false;
        this[entity.kind].push(entity);
        return entity;
    }

    remove(entity) {
        const list = this[entity.kind];
        const i = list.indexOf(entity);

        // swap-and-pop: порядок внутри слоя не важен, зато удаление O(1)
        // и без сдвига массива.
        if (i !== -1) {
            list[i] = list[list.length - 1];
            list.pop();
        }
    }

    /** Пометить на снятие. Фактическое удаление — в конце шага. */
    kill(entity) {
        entity.dead = true;
    }

    /**
     * Разовая запись позиции. Нужна сразу после монтирования компонента:
     * до первого кадра у узла нет transform, и он мигнул бы в начале
     * координат слоя.
     */
    place(entity) {
        if (!entity.node) return;

        entity.node.style.transform =
            `translate3d(${entity.x}px, ${entity.y}px, 0) rotate(${entity.angle}deg)`;
    }

    /** Кандидаты на столкновение среди врагов. */
    queryEnemies(x, y, r) {
        return this.grid.query(x, y, r, this.candidates);
    }

    step = dt => {
        this.advance(this.tank, dt);
        this.advance(this.enemy, dt);

        // Орудия стреляют после того, как носители сдвинулись: иначе снаряд
        // вылетает из позиции прошлого шага.
        this.advance(this.gun, dt);

        // Широкая фаза перестраивается один раз за шаг — после того как враги
        // сдвинулись, но до того как пули начали проверять попадания.
        this.grid.clear();
        for (let i = 0; i < this.enemy.length; i++) {
            const enemy = this.enemy[i];
            if (!enemy.dead) this.grid.insert(enemy);
        }

        this.advance(this.bullet, dt);
        this.sweep();
    };

    advance(list, dt) {
        for (let i = 0; i < list.length; i++) {
            const entity = list[i];
            if (entity.dead || entity.frozen) continue;

            entity.px = entity.x;
            entity.py = entity.y;
            entity.step(entity, dt);
        }
    }

    /**
     * Снятие помеченных сущностей.
     *
     * onRemove() дёргает setState в React, что приводит к размонтированию
     * компонента и обратному вызову remove() — поэтому сначала вычищаем
     * массивы целиком, и только потом вызываем колбэки.
     */
    sweep() {
        const corpses = this.corpses;
        corpses.length = 0;

        this.collect(this.tank, corpses);
        this.collect(this.gun, corpses);
        this.collect(this.enemy, corpses);
        this.collect(this.bullet, corpses);

        for (let i = 0; i < corpses.length; i++) {
            const entity = corpses[i];
            if (entity.onRemove) entity.onRemove(entity);
        }
    }

    collect(list, out) {
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].dead) {
                out.push(list[i]);
                list[i] = list[list.length - 1];
                list.pop();
            }
        }
    }

    /**
     * Единственная фаза записи в DOM. Все чтения лейаута запрещены:
     * чередование чтений и записей — это и есть layout thrashing.
     */
    render = alpha => {
        this.draw(this.tank, alpha);
        this.draw(this.enemy, alpha);
        this.draw(this.bullet, alpha);
    };

    draw(list, alpha) {
        for (let i = 0; i < list.length; i++) {
            const entity = list[i];
            const node = entity.node;
            if (!node || entity.dead || entity.frozen) continue;

            const x = entity.px + (entity.x - entity.px) * alpha;
            const y = entity.py + (entity.y - entity.py) * alpha;

            // translate3d вместо left/top: смещение уходит на композитор,
            // без пересчёта лейаута и перерисовки. rotate идёт после
            // translate — узел-обёртка нулевого размера, поэтому поворот
            // происходит вокруг самой точки позиции.
            node.style.transform =
                `translate3d(${x}px, ${y}px, 0) rotate(${entity.angle}deg)`;
        }
    }
}

export default new World();
