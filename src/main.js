import Phaser from "phaser";
import SampleScene from "./scenes/SampleScene";

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  backgroundColor: 0x65C18C,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      // debug: true
    }
  },
  scene: [SampleScene]
};

export default new Phaser.Game(config);