export default class Mouse extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);

        this.start = {x: config.x, y: config.y};
        this.board = config.board;
        this.isRunning = false;
        this.isReturning = false;
        this.speed = -1;

        this.setInteractive();
        this.setOrigin(0.5, 0);

        // launch mouse
        this.on('pointerdown', (pointer) => {
            this.isRunning = true;
        });
    }

    update() {
        if (this.isRunning) {
            const mousePos = this.board.getMapPosition(this.x, this.y);

            // finish
            if (mousePos.y < 0) {
                this.scene.finish();
                this.isRunning = false;
            }

            // return at home
            if (mousePos.y >= 7 && this.speed > 0) {
                console.log('HOME!');
                this.isRunning = false;
                this.speed /= -2;
                this.scaleY *= -1;

            }

            // turn back
            if (!this.board.isAllowed(mousePos.x , mousePos.y) && mousePos.y < this.board.size.height) {
                console.log("Turn back", this.board.size.height, mousePos.y, this.board.isAllowed(mousePos.x , mousePos.y))
                this.speed *= -2;
                this.scaleY *= -1;
            }

            console.log("Y", this.y)
            this.y += this.speed;

        }

    }
}