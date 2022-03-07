import Phaser from "phaser";
import Scene from "./scenes/SampleScene";

class Demo extends Phaser.Scene {
  constructor() {
    super("demo");
  }

  create() {
    this.add.text(200, 150, "Hello World!", {
      font: "40px Times New Roman",
      color: "#000000",
    });
  }
}

const config:Phaser.Types.Core.GameConfig = {
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
  scene: Scene
};

const game = new Phaser.Game(config);
