export default class Mouse extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        
        this.start = {x: config.x, y: config.y};
        this.board = config.board;
        this.isRunning = false;
        this.isReturning = false;
        this.speed = 6;
        
        this.setInteractive();
        this.setScale(2);
        //this.setOrigin(0);
        
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
                console.log('finish!');
                this.scene.finish();
                this.isRunning = false;
            }
            
            // return at home
            if (mousePos.x < -1 && this.speed < 0) {
                console.log('HOME!');
                this.isRunning = false;
                this.speed /= -2;
                this.scaleX *= -1;
                
            }
            
            // turn back
            if (!this.board.isAllowed(mousePos.x , mousePos.y) && mousePos.x >= 0) {
                this.speed *= -2;
                this.scaleX *= -1;
            }
            
            this.x += this.speed;
        }
        
        
    }
}