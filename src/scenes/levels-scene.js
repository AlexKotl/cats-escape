export default class LevelsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelsScene'})
    }
    
    preload() {
        this.load.image('clew', 'assets/sprites/clew.png');
    }
    
    create() {
        this.add.text(40, 60, "Select cat level", {
            font: '50px Courier',
        });
        
        let level = 1;
        for (let y=0; y<2; y++) {
            for (let x=0; x<3; x++) {
                let spriteX = x * 400 + 200;
                let spriteY = y * 400 + 450;
                let sprite = this.add.sprite(spriteX, spriteY, 'clew').setScale(0.8);
                sprite.setInteractive();
                
                this.add.text(spriteX - 20, spriteY - 30, level, {font: '80px Courier'});
                
                if (level > 3) {
                    sprite.setAlpha(0.3).setTint(0xff0000);
                }
                else {
                    sprite.levelNumber = '00' + level;
                }
                
                level++;
            }
        }
        
        
        this.input.on('pointerdown', (pointer, obj) => {
            if (obj[0] === undefined) {
                return;
            }
            
            const level = obj[0].levelNumber;
            if (level !== undefined) {
                this.scene.start('GameScene', {
                    level: level,
                });
            }
       });
    }
}