export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene'})
    }
    
    preload() {
        this.load.image('cats', 'assets/sprites/menu/cats.png');
        this.load.image('text', 'assets/sprites/menu/text.png');
        this.load.image('menu-mouse', 'assets/sprites/menu/mouse.png');
    }
    
    create() {
        const x = this.game.canvas.width / 2;
        const y = this.game.canvas.height / 2;
        this.add.sprite(x, y, 'cats').setScale(1.5);
        const text = this.add.sprite(x, y, 'text').setAlpha(0).setScale(1.5);
        const mouse = this.add.sprite(-x, y, 'menu-mouse').setScale(1.5);
        
        this.cameras.main.backgroundColor.setTo(255,255,255);
        
        // mouse appear
        this.tweens.add({
            targets: mouse,
            x: x,
            ease: 'Power1',
            duration: 1000,
            delay: 500
        });
        
        // title 
        this.tweens.add({
            targets: text,
            alpha: 1,
            ease: 'Power1',
            duration: 2000,
            delay: 1500
        });
        
        this.input.once('pointerdown', () => {
           this.scene.start('LevelsScene');
        });
    }
}