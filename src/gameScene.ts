import "phaser";
import { BlendModes } from "phaser";

const enigma = `
Tout d'abord, bonne fête mon coeur! 
 Cette année je me suis inspiré d'un clip de chanson que tu as bien aimé. Résous la charade et découvre où se cache ton cadeau ;)
 1- Homonyme de ce qui peut porter une couronne
 2- Moitié d'un type de bébé
 3- Ce qu'à une abeille et qui est contraire à la pile
 4- Ce que tu lances après avoir dit "watch this" mais sans accent
 5- La réponse pour ce mot est au début de l'avion
 6- Montagne que la nièce de la belle-soeur de l'époux de la brue de ma grand-mère pensait au Groenland
 7- Domaine de l'Angleterre
 9- La plus belle`;

const splittedEnigma = enigma.split(" ");

export class GameScene extends Phaser.Scene {
    delta: number;
    lastYarnTime: number;
    yarnsCaught: number;
    starsFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    score: Phaser.GameObjects.Text;
    combo: Phaser.GameObjects.Text;
    yarnGuide: Phaser.Physics.Arcade.Image;
    comboFire: Phaser.GameObjects.Particles.ParticleEmitterManager;

    catCursor: Phaser.Physics.Arcade.Image;

    constructor() {
        super({
            key: "GameScene",
        });
    }

    init(params): void {
        this.delta = 1000;
        this.lastYarnTime = 0;
        this.yarnsCaught = 0;
        this.starsFallen = 0;
    }

    preload(): void {
        this.load.image("bg-cat", "assets/cat-background.png");
        this.load.image("cat", "assets/cat-face.png");
        this.load.image("yarn", "assets/yarn.png");
        this.load.image("empty", "assets/empty.png");

        this.load.audio("music", "assets/zero.mp3");

        this.load.image("fire", "assets/flame1.png");
    }

    create(): void {
        this.add.image(0, 0, "bg-cat").setOrigin(0, 0);
        this.catCursor = this.physics.add.image(400, 400, "cat");
        this.catCursor.setCollideWorldBounds(true);

        this.comboFire = this.add.particles("fire");

        this.score = this.add.text(650, 650, "", {
            font: "64px Arial Bold",
            fill: "#FBFBAC",
        });

        this.combo = this.add.text(625, 725, "COMBO", {
            font: "24px Arial Bold",
            fill: "#FBFBAC",
        });

        this.sound.play("music", { loop: true });

        this.yarnGuide = this.physics.add.image(200, 200, "empty");
        this.yarnGuide.setVelocity(200, 25);
        this.yarnGuide.setBounce(0.9, 0.9);
        this.yarnGuide.setCollideWorldBounds(true);
        this.yarnGuide.setMaxVelocity(250, 250);
        this.yarnGuide.setDisplaySize(275, 75);
    }

    update(time: number): void {
        const diff = time - this.lastYarnTime;
        const random = Phaser.Math.Between(800, 3000);
        if (diff > random) {
            this.lastYarnTime = time;

            this.emitYarn();

            const currentVelocity = this.yarnGuide.body.velocity;
            let aX = 0;
            let aY = 0;

            if (currentVelocity.x > 0) {
                aX = Phaser.Math.Between(-100, 200);
            } else {
                aX = Phaser.Math.Between(-200, -100);
            }

            if (currentVelocity.y > 0) {
                aY = Phaser.Math.Between(-100, 200);
            } else {
                aY = Phaser.Math.Between(-200, -100);
            }

            this.yarnGuide.setAcceleration(aX, aY);
        }

        const cX = this.input.activePointer.x;
        const cY = this.input.activePointer.y;

        this.physics.moveTo(this.catCursor, cX, cY, 300);

        this.score.text = `${this.yarnsCaught}`;
    }

    private onCollision(yarn: Phaser.Physics.Arcade.Image): void {
        yarn.setTint(0x00ff00);
        yarn.setVelocity(0, 0);

        const tips = this.add.text(
            yarn.x,
            yarn.y,
            splittedEnigma[this.yarnsCaught % splittedEnigma.length],
            {
                font: "48px Arial Bold",
                fill: "#000",
            }
        );

        this.time.delayedCall(
            500,
            () => {
                tips.destroy();
            },
            [],
            this
        );

        this.yarnsCaught += 1;

        if (this.yarnsCaught === 5) {
            this.comboFire.createEmitter({
                alpha: { start: 1, end: 0 },
                scale: { start: 0.5, end: 2.5 },
                tint: { start: 0xff945e, end: 0xff945e },
                speed: 20,
                accelerationY: -200,
                angle: { min: -5, max: 55 },
                rotate: { min: -40, max: 40 },
                lifespan: { min: 1000, max: 1100 },
                blendMode: BlendModes.NORMAL,
                frequency: 200,
                x: 670,
                y: 700,
            });
        }

        yarn.destroy();
    }

    private emitYarn(): void {
        var yarn: Phaser.Physics.Arcade.Image;
        var x = this.yarnGuide.x;
        var y = this.yarnGuide.y;
        yarn = this.physics.add.image(x, y, "yarn");
        yarn.setDisplaySize(50, 50);
        this.physics.add.collider(
            yarn,
            this.catCursor,
            () => this.onCollision(yarn),
            null,
            this
        );
    }
}
