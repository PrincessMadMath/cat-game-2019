import { ScoreScene } from "./scoreScene";
import { WelcomeScene } from "./welcomeScene";
import { GameScene } from "./gameScene";
import "phaser";

const config: Phaser.Types.Core.GameConfig = {
    title: "Cat Virus Game",
    width: 800,
    height: 799,
    parent: "game",
    scene: [WelcomeScene, GameScene, ScoreScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    backgroundColor: "#18216D",
};

export class CatVirusGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.onload = () => {
    let game2 = new CatVirusGame(config);
};
