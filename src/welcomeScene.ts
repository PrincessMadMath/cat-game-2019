import "phaser";

export class WelcomeScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "WelcomeScene",
        });
    }

    preload() {
        this.load.image("bg-cat", "assets/cat-background.png");
    }

    create(): void {
        this.add.image(0, 0, "bg-cat").setOrigin(0, 0);

        const titleText = "Collect all the YARN for \n    a special PRIZE!";
        this.title = this.add.text(50, 100, titleText, {
            font: "64px Arial Bold",
            fill: "#dfff2c",
        });

        var hintText: string = "Click to start the game...";
        this.hint = this.add.text(500, 700, hintText, {
            font: "24px Arial Bold",
            fill: "#000",
        });

        this.input.on(
            "pointerdown",
            function(/*pointer*/) {
                this.scene.start("GameScene");
            },
            this
        );
    }
}
