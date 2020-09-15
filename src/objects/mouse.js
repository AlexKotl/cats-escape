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

        // launch mouse
        this.on('pointerdown', (pointer) => {
            this.isRunning = true;
        });
    }

    update() {
        if (this.isRunning) {
            const mousePos = this.board.getMapPosition(this.x, this.y);

            // finish
            if (mousePos.x + 1 >= this.board.size.width) {
                this.scene.finish();
                this.isRunning = false;
            }

            // return at home
            if (mousePos.y < -1 && this.speed < 0) {
                console.log('HOME!');
                this.isRunning = false;
                this.speed /= -2;
                this.scaleY *= -1;

            }

            // turn back
            if (!this.board.isAllowed(mousePos.x , mousePos.y) && mousePos.y >= 0) {
                console.log("Turn back")
                this.speed *= 2;
                this.scaleY *= -1;
            }

            this.y += this.speed;
            console.log("Y", this.y)
        }

    }
}