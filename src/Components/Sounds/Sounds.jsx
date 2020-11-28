
class Sounds {
    constructor() {
        this.audio = new Audio('1111.wav');

        this.audio.preload = 'auto';
    }

    shoot() {
        return this.audio.play();
    }
}

export default new Sounds;