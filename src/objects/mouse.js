export default class Mouse extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);

        this.start = {x: config.x, y: config.y};
        this.board = config.board;
        this.isRunning = false;
        this.isReturning = false;
        this.speed = -0.6;

        this.setInteractive();
        this.setOrigin(0.5, 0);

        // launch mouse
        this.on('pointerdown', (pointer) => {
            this.isRunning = true;
            this.play('run');
        });
    }

    update() {
        if (this.isRunning) {
            const mousePos = this.board.getMapPosition(this.x, this.y);

            // finish
            if (mousePos.y < 0) {
                this.scene.finish();
                this.isRunning = false;
                this.play('idle');
            }

            // return at home
            if (mousePos.y >= 7 && this.speed > 0) {
                console.log('HOME!');
                this.isRunning = false;
                this.speed *= -1;
                this.scaleY *= -1;
                this.play('idle');
            }

            // turn back
            if (!this.board.isAllowed(mousePos.x , mousePos.y) && mousePos.y < this.board.size.height && mousePos.y > -1) {
                console.log("Turn back", this.board.size.height, mousePos.y, this.board.isAllowed(mousePos.x , mousePos.y))
                this.speed *= -1;
                this.scaleY *= -1;
            }

            this.y += this.speed;

        }

    }
}