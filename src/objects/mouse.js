export default class Mouse extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);

        // sounds
        this.screamSound = this.scene.sound.add('scream');
        this.runSound = this.scene.sound.add('run');

        this.start = {x: config.x, y: config.y};
        this.board = config.board;
        this.isRunning = false;
        this.isReturning = false;

        this.setInteractive();
        this.setOrigin(0.5, 0);

        // launch mouse
        this.on('pointerdown', (pointer) => {
            this.isRunning = true;
            this.play('run');
            this.runSound.play();
        });

        // animations
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('mouse', {
                start: 3,
                end: 6,
            }),
            frameRate: 10,
            yoyo: false,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('mouse', {
                start: 0,
                end: 0,
            }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'sneak',
            frames: this.scene.anims.generateFrameNumbers('mouse', {
                start: 0,
                end: 2,
            }),
            frameRate: 5,
            repeat: 3
        });
    }

    update(time, delta) {
        if (this.speed === undefined) {
            this.speed = -0.1 * delta;
        }

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
                // reverse speed and direction
                this.speed *= -1;
                this.scaleY *= -1;
                this.play('idle');
                this.runSound.stop();
            }

            // turn back
            if (!this.board.isAllowed(mousePos.x , mousePos.y) && mousePos.y < this.board.size.height && mousePos.y > -1) {
                console.log("Turn back", this.board.size.height, mousePos.y, this.board.isAllowed(mousePos.x , mousePos.y))
                this.speed *= -1;
                this.scaleY *= -1;
                this.screamSound.play();
            }

            this.y += this.speed;

        }
        else {
            // make sneaking very ocasionaly
            if (Math.random() * 1010 > 1008) {
                this.play('sneak');
            }
        }

    }
}