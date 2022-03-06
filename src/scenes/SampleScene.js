import Phaser from 'phaser'
import Pixel from '../gameObjects/pixel';
import Platform from '../gameObjects/platform';
import Player from '../gameObjects/player';

export default class SampleScene extends Phaser.Scene {
    /** @type {Phaser.GameObjects.Rectangle} */
    platform

    /** @type {Phaser.GameObjects.Rectangle} */
    player

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    /** @type {Phaser.GameObjects.Rectangle} */
    pixels = []

    constructor() {
        super('hello-world')
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        this.platform = new Platform(this, this.centerX, this.height * .3, 100, 30, 0xFFEDDB)
        this.player = new Player(this, this.centerX, 0, 20, 20, 0xFFC15E)
        // this.createPixels()

        this.physics.add.collider(this.platform, this.player, function (platform, player) {
            if (platform) {
                // platform.destroy()
            }
        });
    }

    get centerX() {
        return this.width / 2
    }

    get centerY() {
        return this.height / 2
    }

    get height() {
        return this.sys.game.canvas.height
    }

    get width() {
        return this.sys.game.canvas.width
    }

    createPixels() {
        const green = 0x00ff00
        const red = 0xff0000
        const black = 0x000000
        const colors = [green, red, black]
        // 0x7882A4

        const watermelon = [
            "GRRRBRG", // 6
            // "GRBRRRG",
            // "-GRRRG-",
            // "--GGG--"
        ]

        const pixelSize = (this.width * .6) / watermelon[0].length
        const startX = this.width * .2

        for (let i = 0; i < watermelon[0].length; i++) {
            this.pixels.push(new Pixel(this, startX + i * pixelSize, this.centerY + 50, pixelSize, pixelSize, sample(colors)))
        }
    }
}