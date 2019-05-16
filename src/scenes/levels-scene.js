export default class LevelsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelsScene'})
    }
    
    preload() {
        this.load.image('clew', 'assets/sprites/clew.png');
    }
    
    create() {
        this.add.text(20, 20, "Select cat level", {
            font: '24px Courier',
        });
        
        let level = 1;
        for (let y=0; y<2; y++) {
            for (let x=0; x<3; x++) {
                let spriteX = x * 250 + 100;
                let spriteY = y * 170 + 150;
                let sprite = this.add.sprite(spriteX, spriteY, 'clew').setScale(0.4);
                this.add.text(spriteX - 20, spriteY - 30, level, {font: '80px Courier'});
                
                if (level > 1) {
                    sprite.setAlpha(0.3);
                }
                
                level++;
            }
        }
        
        
        this.input.once('pointerdown', () => {
           this.scene.start('BlocksScene');
       });
    }
}