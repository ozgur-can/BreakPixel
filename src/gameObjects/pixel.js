import Phaser from 'phaser'

export default class Pixel extends Phaser.GameObjects.Rectangle {
    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} width 
     * @param {*} height 
     * @param {*} fillColor 
     */
    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor)
        
        scene.physics.add.existing(this, true)
        this.body.collideWorldBounds = true
        scene.add.existing(this)
    }
}