export default class CompleteScene extends Phaser.Scene {

    constructor() {
        super({ key: 'CompleteScene'})
    }

    preload() {
        this.load.image('house-sky', 'assets/sprites/house/house-sky.png');

    }

    create() {
        this.skyBackground = this.add.tileSprite(0, 0, 150, 250, 'house-sky').setOrigin(0);

        this.add.text(20, 54, "Congratulations! \nYou have passed all levels!\n\n\nPlease give us feedback and we will add more cats and levels very soon...", {
            font: '5px bitmapFont',
            color: '#fff',
            wordWrap: {
                width: 110,
                useAdvancedWrap: true
            }
        });
        // this.add.text(20, 150, "akotl256@gmail.com", {
        //     font: '5px bitmapFont',
        //     color: '#383a3b',
        // });

        // put some delay, so user wont be able to skip by mistake
        setTimeout(() => {
            this.input.on('pointerup', (pointer, obj) => {
                this.scene.start('LevelsScene');
           });
        }, 3000);

    }

    update(time, delta) {
        this.skyBackground.tilePositionX += delta * 0.002;
    }
}