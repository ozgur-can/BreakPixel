import Phaser from 'phaser'
import Pixel from '../gameObjects/pixel'
import Platform from '../gameObjects/platform'
import Player from '../gameObjects/player'
import _ from "lodash"

export default class SampleScene extends Phaser.Scene {
    /** @type {Phaser.GameObjects.Rectangle} */
    platform

    /** @type {Phaser.GameObjects.Rectangle} */
    player

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    /** @type {Phaser.GameObjects.Rectangle} */
    pixels = []

    pixelSize

    constructor() {
        super('hello-world')
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        this.add.text(this.centerX, this.height * .9, "Use '<' and '>' to move player").setOrigin(0.5)
        this.player = new Player(this, this.centerX, 50, 20, 20, 0xFFC15E)
        this.createPixels()

        let forceDir = new Phaser.Math.Vector2()
        forceDir.set(Phaser.Math.Between(100, 200), Phaser.Math.Between(-100, -500))

        this.physics.add.collider(this.pixels, this.player, function (pixel, player) {
            if (player) {
                if (pixel.y - player.y <= player.displayWidth) {
                    if (player.x > pixel.x)
                        player.body.setAcceleration(forceDir.x, forceDir.y)
                    else
                        player.body.setAcceleration(-forceDir.x, forceDir.y)
                    
                    setTimeout(() => player.body.setAcceleration(0, 0), 250)
                    setTimeout(() => player.body.setVelocityX(0), 1000)
                }

                pixel.destroy()
            }
        })

        this.physics.world.on('worldbounds', this.onWorldBounds)
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-50)
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(50)
        }
    }

    onWorldBounds() {
        this.player.body.setVelocity(0);
        this.player.body.setBounce(0);
    }

    createPixels() {   
        const green = 0x00ff00
        const red = 0xff0000
        const black = 0x000000

        const watermelon = [
            "GRRRBRG",
            "GRBRRRG",
            "-GRRRG-",
            "--GGG--"
        ]

        this.pixelSize = (this.width * .6) / watermelon[0].length
        const startX = this.width * .2

        for (let i = 0; i < watermelon.length; i++) {     
            for (let j = 0; j < watermelon[i].length; j++) {
                if(watermelon[i][j] === "-") continue;
                let color;
                if (watermelon[i][j] === "G")
                    color = green;
                if (watermelon[i][j] === "R")
                    color = red;
                if (watermelon[i][j] === "B")
                    color = black;
                const pixel = new Pixel(this, startX + j * this.pixelSize, this.centerY + i * this.pixelSize, this.pixelSize, this.pixelSize, color)
                this.pixels.push(pixel)
            }
        }
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
}